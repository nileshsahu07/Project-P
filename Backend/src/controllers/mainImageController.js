const KeyInfo = require("../models/keyInfoData");
const MainImage = require("../models/mainImageData");
const OtherImages = require("../models/otherImagesData");
const SliderImages = require("../models/sliderImagesData");
const ApiError = require("../Utils/apiError");
const ApiResponse = require("../Utils/apiResponse");
const mongoose = require("mongoose");
const asyncHandler = require("../Utils/asyncHandler");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../Utils/cloudinary");

exports.getMainImage = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if(id){
        const objectId = new mongoose.Types.ObjectId(id); // Convert id to ObjectId
    
        const models = {
            keyInfo: KeyInfo,
            otherImages: OtherImages,
            sliderImages: SliderImages
        };
        
        let allData = {};
        
        // Fetch MainImage separately
        allData.mainImage = await MainImage.findOne({ _id: objectId }).populate("teamMembers.id");
        
        // Fetch other collections using projectId
        for (const [key, model] of Object.entries(models)) {
            allData[key] = await model.find({ projectId: objectId });
        }
    
        return res.status(200).json(
            new ApiResponse(201,allData,"Main Image Data fetched successfully") 
        );
    }else{
        const mainImageData = await MainImage.find({}).select("mainImage")

        if(!mainImageData){
            throw new ApiError(404, "Main Image not found");
        };

        return res.status(200).json(
            new ApiResponse(201,mainImageData,"Main Image Data fetched successfully") 
        );
    }
   
});

exports.uploadMainImageData = asyncHandler(async (req, res) => {
    const { title,sub_title,category,imageDesc, description,teamMembers } = req.body;
    const image = req.file;

    if ([title, sub_title,category,imageDesc,description ].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
      }

    if (!image) {
      throw new ApiError(400, "Main Image not uploaded");
    }

    const imageCloudinary = await uploadOnCloudinary(image.path);

    const MainImageData = await MainImage.create({
        MainImage:{
            public_Id:imageCloudinary.public_id,
            url:imageCloudinary.secure_url
        },
        title,
        description,
        sub_title,
        category,
        imageDesc,
        teamMembers
    });

    if (!MainImageData) {
        throw new ApiError(500, "Main Image Data not created");
    }

    return res.status(200).json(
        new ApiResponse(201, "Main Image Data created successfully")
    );
});

exports.updateMainImageData = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, sub_title, category, imageDesc, description } = req.body;
    const mainImage = req.file;

    // Fetch existing data including all relevant fields
    const existingMainImageData = await MainImage.findById(id).select(
        "image title sub_title category imageDesc description"
    );

    if (!existingMainImageData) {
        throw new ApiError(404, "Main Image Data not found");
    }

    const updatedFields = { ...existingMainImageData._doc }; // Preserve existing fields

    const bodyFields = { title, sub_title, category, imageDesc, description };

    // Update only non-empty and non-whitespace values
    for (const [key, value] of Object.entries(bodyFields)) {
        if (value !== undefined && value.trim() !== "") {
            updatedFields[key] = value;
        }
    }

    // Handle image update
    if (mainImage) {
        const imageCloudinary = await uploadOnCloudinary(mainImage.path);

        if (existingMainImageData.mainImage?.public_Id) {
            await deleteOnCloudinary(existingMainImageData.mainImage.public_Id);
        }

        updatedFields.mainImage = {
            public_Id: imageCloudinary.public_id,
            url: imageCloudinary.secure_url,
        };
    }

    // Update the document
    const updatedMainImageData = await MainImage.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
    );

    if (!updatedMainImageData) {
        throw new ApiError(500, "Main Image Data not updated");
    }

    return res.status(200).json(
        new ApiResponse(200, "Main Image Data updated successfully")
    );
});


exports.deleteMainImageData = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existingMainImageData = await MainImage.findById(id);

    if (!existingMainImageData) {
        throw new ApiError(404, "Main Image Data not found");
    }

    const deletedMainImageData = await MainImage.findByIdAndDelete(id);

    if (!deletedMainImageData) {
        throw new ApiError(500, "Main Image Data not deleted");
    }

    if(existingMainImageData.mainImage?.public_Id){
        await deleteOnCloudinary(existingMainImageData.mainImage.public_Id);
    }

    return res.status(200).json(
        new ApiResponse(200, "Main Image Data deleted successfully")
    );
});