const OtherImages = require("../models/otherImagesData.js");
const ApiError = require("../Utils/apiError");
const ApiResponse = require("../Utils/apiResponse");
const asyncHandler = require("../Utils/asyncHandler");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../Utils/cloudinary");

exports.uploadOtherImageData = asyncHandler(async (req, res) => {
    const { sideImageDesc,sideImageTitle} = req.body;
    const images = req.files;
    const{ projectId} = req.query;

    // console.log(images) 

    if ([sideImageDesc,sideImageTitle ].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    if (!images) {
      throw new ApiError(400, "Other Images not uploaded");
    }

    if(images.firstBigImage.length === 0 && images.secondBigImage.length === 0 && images.sideImage.length === 0){
       throw new ApiError(400, "All Images are required");
    } 

    const firstBigImageCloudinary = await uploadOnCloudinary(images.firstBigImage[0].path);
    const secondBigImageCloudinary = await uploadOnCloudinary(images.secondBigImage[0].path);
    const sideImageCloudinary = await uploadOnCloudinary(images.sideImage[0].path);

    const otherImageData = await OtherImages.create({
        firstBigImage:{
            public_Id:firstBigImageCloudinary.public_id,
            url:firstBigImageCloudinary.secure_url
        },
        secondBigImage:{
            public_Id:secondBigImageCloudinary.public_id,
            url:secondBigImageCloudinary.secure_url
        },
        sideImage:{
            public_Id:sideImageCloudinary.public_id,
            url:sideImageCloudinary.secure_url
        },
        sideImageTitle,
        sideImageDesc,
        projectId:projectId
    });

    if (!otherImageData) {
        throw new ApiError(500, "Other Image Data not created");
    }

    return res.status(201).json(
        new ApiResponse(201, [], "Other Image Data created successfully")
    );
});

exports.updateOtherImageData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { sideImageDesc, sideImageTitle } = req.body;
    const { firstBigImage, secondBigImage, sideImage } = req.files || {};

    // Fetch existing data
    const existingOtherImageData = await OtherImages.findById(id).select(
        "firstBigImage secondBigImage sideImage sideImageTitle sideImageDesc"
    );

    if (!existingOtherImageData) {
        throw new ApiError(404, "Other Image Data not found");
    }

    const updatedFields = { ...existingOtherImageData._doc };

    // Upload new images only if provided
    if (firstBigImage) {
        const firstBigImageCloudinary = await uploadOnCloudinary(firstBigImage[0].path);
        updatedFields.firstBigImage = {
            public_Id: firstBigImageCloudinary.public_id,
            url: firstBigImageCloudinary.secure_url,
        };
        await deleteOnCloudinary(existingOtherImageData.firstBigImage.public_Id);
    }

    if (secondBigImage) {
        const secondBigImageCloudinary = await uploadOnCloudinary(secondBigImage[0].path);
        updatedFields.secondBigImage = {
            public_Id: secondBigImageCloudinary.public_id,
            url: secondBigImageCloudinary.secure_url,
        };
        await deleteOnCloudinary(existingOtherImageData.secondBigImage.public_Id);
    }

    if (sideImage) {
        const sideImageCloudinary = await uploadOnCloudinary(sideImage[0].path);
        updatedFields.sideImage = {
            public_Id: sideImageCloudinary.public_id,
            url: sideImageCloudinary.secure_url,
        };
        await deleteOnCloudinary(existingOtherImageData.sideImage.public_Id);
    }

    // Update only non-empty text fields
    if (sideImageTitle !== undefined && sideImageTitle.trim() !== "") {
        updatedFields.sideImageTitle = sideImageTitle;
    }
    if (sideImageDesc !== undefined && sideImageDesc.trim() !== "") {
        updatedFields.sideImageDesc = sideImageDesc;
    }

    // Update the document
    const updatedOtherImageData = await OtherImages.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
    );

    if (!updatedOtherImageData) {
        throw new ApiError(500, "Other Image Data not updated");
    }

    return res.status(200).json(
        new ApiResponse(200, "Other Image Data updated successfully")
    );
});

exports.deleteOtherImageData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the document first to check if it exists
    const otherImageData = await OtherImages.findById(id);

    if (!otherImageData) {
        throw new ApiError(404, "Other Image Data not found");
    }

    // Delete images from Cloudinary if they exist
    if (otherImageData.firstBigImage?.public_Id) {
        await deleteOnCloudinary(otherImageData.firstBigImage.public_Id);
    }
    if (otherImageData.secondBigImage?.public_Id) {
        await deleteOnCloudinary(otherImageData.secondBigImage.public_Id);
    }
    if (otherImageData.sideImage?.public_Id) {
        await deleteOnCloudinary(otherImageData.sideImage.public_Id);
    }

    // Now delete the document from the database
    await OtherImages.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, "Other Image Data deleted successfully")
    );
});
