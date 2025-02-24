const keyInfo = require("../models/keyInfoData");
const ApiError = require("../Utils/apiError");
const ApiResponse = require("../Utils/apiResponse");
const asyncHandler = require("../Utils/asyncHandler");

exports.uploadKeyInfoData = asyncHandler(async (req, res) => {
    const { heading,subHeading} = req.body;
    const {projectId} = req.query;

    if(heading.length === 0 && subHeading.length === 0){
        throw new ApiError(400, "All fields are required");
    }

    if (!projectId) {
        throw new ApiError(400, "Project Id is required");
    }

    let keyInfoData = [];
    for(let i=0; i<heading.length; i++){
        const createdData = await keyInfo.create({ 
            heading:heading[i], 
            subHeading:subHeading[i],
            projectId:projectId 
        });
        keyInfoData.push(createdData);
    }

    if (keyInfoData.length === 0) {
        throw new ApiError(500, "Key Info Data not created");
    }

    return res.status(201).json(
        new ApiResponse(201, "Key Info Data created successfully")
    );
});

exports.updateKeyInfoData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { heading, subHeading } = req.body;

    // Build updated fields dynamically
    const updatedFields = {};

    if (heading !== undefined && heading.trim() !== "") {
        updatedFields.heading = heading;
    }
    if (subHeading !== undefined && subHeading.trim() !== "") {
        updatedFields.subHeading = subHeading;
    }

    // If no valid fields are provided, return an error
    if (Object.keys(updatedFields).length === 0) {
        throw new ApiError(400, "At least one field must be provided for update");
    }

    // Update the document
    const keyInfoData = await keyInfo.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
    );

    if (!keyInfoData) {
        throw new ApiError(500, "Key Info Data not updated");
    }

    return res.status(200).json(
        new ApiResponse(200, "Key Info Data updated successfully")
    );
});


exports.deleteKeyInfoData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const keyInfoData = await keyInfo.findByIdAndDelete(id);

    if (!keyInfoData) {
        throw new ApiError(500, "Key Info Data not deleted");
    }

    return res.status(200).json(
        new ApiResponse(200, "Key Info Data deleted successfully")
    );
});

