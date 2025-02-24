const TeamMemberInfo = require("../models/teamData.js");
const ApiError = require("../Utils/apiError.js");
const ApiResponse = require("../Utils/apiResponse.js");
const asyncHandler = require("../Utils/asyncHandler.js");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../Utils/cloudinary.js");

exports.getTeamMemberInfo = asyncHandler(async (_, res) => {
    
    const teamMemberData = await TeamMemberInfo.find({})

    if(!teamMemberData){
      throw new ApiError(404, "TeamMember Data not found");
    };

    return res.status(200).json(
        new ApiResponse(201,teamMemberData,"TeamMember Data fetched successfully") 
    );
});

exports.uploadTeamMemberData = asyncHandler(async (req, res) => {
    const { teamMemberName,teamMemberRole,teamMemberDesc,teamMemberPara,teamMemberEmail,teamMemberLinkedin } = req.body;
    const teamMemberImage = req.file;

    if ([teamMemberName,teamMemberRole,teamMemberDesc,teamMemberPara,teamMemberEmail,teamMemberLinkedin].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (!teamMemberImage) {
      throw new ApiError(400, "TeamMember Image not uploaded");
    }

    const imageCloudinary = await uploadOnCloudinary(teamMemberImage.path);

    const teamMemberData = await TeamMemberInfo.create({
        teamMemberImage:{
            public_Id:imageCloudinary.public_id,
            url:imageCloudinary.secure_url
        },
        teamMemberName,
        teamMemberRole,
        teamMemberDesc,
        teamMemberPara,
        teamMemberEmail,
        teamMemberLinkedin,
    });

    if (!teamMemberData) {
        throw new ApiError(500, "TeamMember Data not created");
    }

    return res.status(201).json(
        new ApiResponse(201, "TeamMember Data created successfully")
    );
});

exports.updateTeamMemberData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { teamMemberName, teamMemberRole, teamMemberDesc, teamMemberPara, teamMemberEmail, teamMemberLinkedin } = req.body;
    const image = req.file;

    // Ensure at least one valid field is provided
    if (![teamMemberName, teamMemberRole, teamMemberDesc, teamMemberPara, teamMemberEmail, teamMemberLinkedin, image].some(field => field !== undefined && field !== "")) {
        throw new ApiError(400, "At least one field is required for update");
    }

    // Fetch existing team member data
    const existingTeamMemberData = await TeamMemberInfo.findById(id).select("teamMemberImage");

    if (!existingTeamMemberData) {
        throw new ApiError(404, "Team Member Data not found");
    }

    const updatedFields = {};

    // Map non-empty fields for update
    const bodyFields = {
        teamMemberName,
        teamMemberRole,
        teamMemberDesc,
        teamMemberPara,
        teamMemberEmail,
        teamMemberLinkedin
    };

    for (const [key, value] of Object.entries(bodyFields)) {
        if (value !== undefined && value.trim() !== "") {
            updatedFields[key] = value;
        }
    }

    // Handle image update
    if (image) {
        const imageCloudinary = await uploadOnCloudinary(image.path);
        updatedFields.teamMemberImage = {
            public_Id: imageCloudinary.public_id,
            url: imageCloudinary.secure_url
        };

        // Delete old image only if it exists
        if (existingTeamMemberData.teamMemberImage?.public_Id) {
            await deleteOnCloudinary(existingTeamMemberData.teamMemberImage.public_Id);
        }
    }

    // Update the document
    const updatedTeamMemberData = await TeamMemberInfo.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
    );

    if (!updatedTeamMemberData) {
        throw new ApiError(500, "Team Member Data not updated");
    }

    return res.status(200).json(
        new ApiResponse(200, "Team Member Data updated successfully")
    );
});

exports.deleteTeamMemberData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the existing team member data
    const existingTeamMemberData = await TeamMemberInfo.findById(id);

    if (!existingTeamMemberData) {
        throw new ApiError(404, "Team Member Data not found");
    }

    // Delete the image from Cloudinary if it exists
    if (existingTeamMemberData.teamMemberImage?.public_Id) {
        await deleteOnCloudinary(existingTeamMemberData.teamMemberImage.public_Id);
    }

    // Delete the team member data from the database
    await TeamMemberInfo.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, null, "Team Member Data deleted successfully")
    );
});
