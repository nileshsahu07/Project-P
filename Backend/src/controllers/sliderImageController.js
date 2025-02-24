const SliderImages = require("../models/sliderImagesData.js");
const ApiError = require("../Utils/apiError");
const ApiResponse = require("../Utils/apiResponse");
const asyncHandler = require("../Utils/asyncHandler");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../Utils/cloudinary");

exports.uploadSliderImageData = asyncHandler(async (req, res) => {
    const { sliderTitle,sliderDesc } = req.body;
    const {sliderImage} = req.files;
    const {projectId} = req.query;

    if(sliderDesc.length === 0){
        throw new ApiError(400, "All fields are required");
    }

    if (!sliderImage.length === 0 ) {
      throw new ApiError(400, "Slider Images not uploaded");
    }

    const sliderImageData = [];
    for(let i=0; i<sliderImage.length; i++){
        const imageCloudinary = await uploadOnCloudinary(sliderImage[i].path);
        const createdData = await SliderImages.create({ 
            sliderTitle, 
            sliderImage: {
                public_Id:imageCloudinary.public_id,
                url:imageCloudinary.secure_url
            },
            sliderDesc:sliderDesc[i],
            projectId:projectId 
        });
        sliderImageData.push(createdData);
    }

    return res.status(201).json(
        new ApiResponse(201, "Slider Image Data created successfully")
    );
});

exports.updateSliderImageData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { sliderTitle, sliderDesc } = req.body;
    const sliderImage = req.file; 

    // Ensure at least one valid field is provided
    if (![sliderTitle, sliderDesc].some(field => field !== undefined && field !== "") &&
    (!sliderImage || sliderImage.length === 0)) {
        throw new ApiError(400, "At least one field is required for update");
    }

    // Fetch existing data
    const existingData = await SliderImages.findById(id);

    if (!existingData) {
        throw new ApiError(404, "Slider Image Data not found");
    }

    const updatedFields = {};

    // Upload new image if provided
    if (sliderImage) {
        const imageCloudinary = await uploadOnCloudinary(sliderImage.path);
        updatedFields.sliderImage = {
            public_Id: imageCloudinary.public_id,
            url: imageCloudinary.secure_url
        };
        await deleteOnCloudinary(existingData.sliderImage.public_Id);
    }

    // Update only provided text fields
    if (sliderTitle !== undefined && sliderTitle.trim() !== "") {
        updatedFields.sliderTitle = sliderTitle;
    }
    if (sliderDesc !== undefined && sliderDesc.trim() !== "") {
        updatedFields.sliderDesc = sliderDesc;
    }

    // Update the document
    const updatedSliderImageData = await SliderImages.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
    );

    if (!updatedSliderImageData) {
        throw new ApiError(500, "Slider Image Data not updated");
    }

    return res.status(200).json(
        new ApiResponse(200,"Slider Image Data updated successfully")
    );
});

exports.deleteSliderImageData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find the document before deleting
    const sliderImageData = await SliderImages.findById(id);

    if (!sliderImageData) {
        throw new ApiError(404, "Slider Image Data not found");
    }

    // Delete image from Cloudinary if it exists
    if (sliderImageData.sliderImage?.public_Id) {
        await deleteOnCloudinary(sliderImageData.sliderImage.public_Id);
    }

    // Now delete the document from the database
    await SliderImages.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, "Slider Image Data deleted successfully")
    );
});
