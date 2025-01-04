const UserEmail = require("../models/userEmailsModel.js")
const ApiError = require("../Utils/apiError.js");
const ApiResponse = require("../Utils/apiResponse.js")



exports.userEmail = async (req,res)=>{
    try {
        const {userEmail} = req.body;

        if(!userEmail){
            throw new ApiError(400,"Email is required !!!")
        }

        const existingEmail = await UserEmail.findOne({userEmail})

        if(existingEmail){
            throw new ApiError(409,"this email is already exists")
        }

        const sent = await UserEmail.create({
            userEmail,
        })  

        const yourEmail = await UserEmail.findById(sent._id);

        if(!yourEmail){
            throw new ApiError(401,"failed to send email, please try again!!!")
        }

        return res.status(201).json(
            new ApiResponse(200,yourEmail,"Email sent successfully")
        )

    } catch (error) {
        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Internal Server Error";
        res.status(statusCode).json({
          success: false,
          error: errorMessage,
        });
      }
}

exports.getUserEmail = async (req, res) => {
    try {
      const userEmails = await UserEmail.find().select("userEmail");
  
      if (!userEmails || userEmails.length === 0) {
        throw new ApiError(404, "No emails found");
      }
  
      return res.status(200).json(
        new ApiResponse(200, userEmails, "Emails fetched successfully")
      );
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const errorMessage = error.message || "Internal Server Error";
      res.status(statusCode).json({
        success: false,
        error: errorMessage,
      });
    }
};