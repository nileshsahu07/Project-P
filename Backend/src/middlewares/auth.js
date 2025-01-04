const JWT = require("jsonwebtoken")
const ApiError = require("../Utils/apiError")
const User = require("../models/userModel")

const verifyJWT = async(req, _, next)=>{
    try{
        // console.log(req.cookies)
        const token = req?.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401,"Unauthorized request");
        }

        const decodedToken = JWT.verify(token,process.env.TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(" -password -token");

        if(!user){
            throw new ApiError(401,"Invalid Token")
        }

        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Token")
    }
}

module.exports = verifyJWT