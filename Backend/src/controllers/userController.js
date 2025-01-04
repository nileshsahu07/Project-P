const User = require("../models/userModel");
const ApiError = require("../Utils/apiError");
const ApiResponse = require("../Utils/apiResponse");

const generateNewToken = async(userId)=>{
    try {
        
        const user = await User.findById(userId);

        const generatedToken = user.generateToken()

        user.token = generatedToken;

        await user.save({validateBeforeSave: false});

        return generatedToken;

    } catch (error) {
        throw new ApiError(500,"Something went wrong when generating token")
    }
};

exports.registerUser = async(req,res,next)=>{
    
    try {
        const {userName,email,password} = req.body
    
        if([userName,email,password].some(
            (field)=>(field?.trim()==="")
        )){
            throw new ApiError(400,"All fields are required")
        }
    
        const userExist = await User.findOne({
            $or:[{ userName },{ email }]
        })
    
        if (userExist){
            throw new ApiError(409, "user with username or email already exists")
        }
    
        const user = await User.create({
            userName: userName,
            email,
            password,
        })
    
        const createdUser = await User.findById(user._id).select("-password -token")
    
        if(!createdUser) throw new ApiError(500,"user registration failed, please try again")
    
        return res.status(201).json(
            new ApiResponse(200, createdUser, "user registration successfully")
        )
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Internal Server Error";
        res.status(statusCode).json({
            success: false,
            error: errorMessage
        });
    }
}

exports.loginUser = async(req,res,next)=>{
    try {
        const {userName,email,password} = req.body;
    
        if(!(userName || email)){
            throw new ApiError(400,"Username or email is required")
        }
    
        const user = await User.findOne({
            $or:[{email},{userName}]
        })

        // console.log(user)
    
        if(!user){
            throw new ApiError(404,"User doesn't exist")
        }
    
        const isPasswordCorrect = await user.comparePassword(password);
    
        if(!isPasswordCorrect){
            throw new ApiError(401, "Invalid user credentials")
        }
    
        const generatedToken = await generateNewToken(user._id);
    
        const loggedInUser = await User.findById(user._id).select("-password -token");
    
        const options = {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        };
    
        return res.status(200)
        .cookie("token",generatedToken,options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,generatedToken
                },
                "User Logged in successfully !!!."
            )
        )
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Internal Server Error";
        res.status(statusCode).json({
            success: false,
            error: errorMessage
        });
    }
}