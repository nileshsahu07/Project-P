const ItemImages = require("../models/itemImageModel.js");
const ApiError = require("../Utils/apiError.js");
const ApiResponse = require("../Utils/apiResponse.js")
const {uploadOnCloudinary,deleteOnCloudinary} = require("../Utils/cloudinary.js");


exports.uploadItemImages = async (req, res) => {
  try {
    const {
      title,
      sub_title,
      category,
      imageDesc,
      keyInfoHeading,
      keyInfoDesc,
      bigImageDesc,
      personName,
      sliderHeading,
      sliderDesc,
      thirdImageHeading,
      thirdImageDesc,
      feedbackHeading,
      feedbackDesc,
      feedbackName,
    } = req.body;
    
    const files = req.files; // Access all uploaded files
    
    // Combine body fields into an array and check if at least one field has a value
    const bodyFields = [
      title,
      sub_title,
      category,
      imageDesc,
      keyInfoHeading,
      keyInfoDesc,
      bigImageDesc,
      personName,
      sliderHeading,
      sliderDesc,
      thirdImageHeading,
      thirdImageDesc,
      feedbackHeading,
      feedbackDesc,
      feedbackName,
    ];
    
    const hasBodyField = bodyFields.some((field) => field && field.trim().length > 0);
    const hasFileField = files && Object.keys(files).length > 0;
    
    if (!hasBodyField && !hasFileField) {
      throw new ApiError(400, "At least one field or image is required!");
    }
    
      const uploadImageToCloudinary = async (file) => {
          const imageLocalPath = file.path;
          const uploadResult = await uploadOnCloudinary(imageLocalPath);
          return {
              public_Id: uploadResult.public_id,
              url: uploadResult.secure_url,
          };
      };

      const uploadedImages = {
          image: files.image ? await uploadImageToCloudinary(files.image[0]) : undefined,
          bigImage: files.bigImage ? await uploadImageToCloudinary(files.bigImage[0]) : undefined,
          personImage: files.personImage ? await uploadImageToCloudinary(files.personImage[0]) : undefined,
          sliderImage: files.sliderImage ? await uploadImageToCloudinary(files.sliderImage[0]) : undefined,
          thirdImage: files.thirdImage ? await uploadImageToCloudinary(files.thirdImage[0]) : undefined,
          feedbackImage: files.feedbackImage ? await uploadImageToCloudinary(files.feedbackImage[0]) : undefined,
      };

      const itemImages = await ItemImages.create({
          image: uploadedImages.image,
          bigImage: uploadedImages.bigImage,
          personImage: uploadedImages.personImage,
          sliderImage: uploadedImages.sliderImage,
          thirdImage: uploadedImages.thirdImage,
          feedbackImage: uploadedImages.feedbackImage,
          title,
          sub_title,
          category,
          imageDesc,
          keyInfoHeading,
          keyInfoDesc,
          bigImageDesc,
          personName,
          sliderHeading,
          sliderDesc,
          thirdImageHeading,
          thirdImageDesc,
          feedbackHeading,
          feedbackDesc,
          feedbackName,
      });

      const uploadedInfo = await ItemImages.findById(itemImages._id);

      if (!uploadedInfo) throw new ApiError(500, "Project Data creation failed, please try again.");

      return res.status(201).json(
          new ApiResponse(200, uploadedInfo, "Project Data uploaded successfully")
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

exports.getItemImages = async (req, res) => {
  try {
    const itemData = await ItemImages.find();

    if (!itemData || itemData.length === 0) {
      throw new ApiError(404, "No data found");
    }

    return res.status(200).json(
      new ApiResponse(200, itemData, "Data fetched successfully")
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

exports.updateItemImages = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      title,
      sub_title,
      category,
      imageDesc,
      keyInfoHeading,
      keyInfoDesc,
      bigImageDesc,
      personName,
      sliderHeading,
      sliderDesc,
      thirdImageHeading,
      thirdImageDesc,
      feedbackHeading,
      feedbackDesc,
      feedbackName,
    } = req.body;

    const files = req.files; // Access uploaded files

    // Fetch the existing item to ensure updates are applied correctly
    const existingItem = await ItemImages.findById(id).select(
      "image bigImage personImage sliderImage thirdImage feedbackImage"
    );

    if (!existingItem) {
      throw new ApiError(404, "Item not found");
    }

    // Prepare updated fields dynamically
    const updatedFields = {};

    const bodyFields = {
      title,
      sub_title,
      category,
      imageDesc,
      keyInfoHeading,
      keyInfoDesc,
      bigImageDesc,
      personName,
      sliderHeading,
      sliderDesc,
      thirdImageHeading,
      thirdImageDesc,
      feedbackHeading,
      feedbackDesc,
      feedbackName,
    };

    // Include only fields from req.body that are not empty
    for (const [key, value] of Object.entries(bodyFields)) {
      if (value && value.trim()) {
        updatedFields[key] = value;
      }
    }

    const uploadImageToCloudinary = async (file) => {
      const imageLocalPath = file.path;
      const uploadResult = await uploadOnCloudinary(imageLocalPath);
      return {
        public_Id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    };

    // Include only files from req.files that are provided
    if (files) {
      const fieldsToUpdate = [
        { key: "image", modelKey: "image" },
        { key: "bigImage", modelKey: "bigImage" },
        { key: "personImage", modelKey: "personImage" },
        { key: "sliderImage", modelKey: "sliderImage" },
        { key: "thirdImage", modelKey: "thirdImage" },
        { key: "feedbackImage", modelKey: "feedbackImage" },
      ];

      for (const { key, modelKey } of fieldsToUpdate) {
        if (files[key]) {
          const uploadedImage = await uploadImageToCloudinary(files[key][0]);
          updatedFields[modelKey] = uploadedImage;

          // Delete the old image on Cloudinary if a new one is provided
          const existingImage = existingItem[modelKey];
          if (existingImage?.public_Id) {
            await deleteOnCloudinary(existingImage.public_Id);
          }
        }
      }
    }

    // Update only the fields that were modified
    const updatedItem = await ItemImages.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedItem) {
      throw new ApiError(500, "Failed to update item");
    }

    return res.status(200).json(
      new ApiResponse(200, updatedItem, "Data update successful")
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

exports.deleteItemById = async (req, res) => {
  try {
    const id = req.params.id;

    // Fetch the item to get all associated image public IDs
    const item = await ItemImages.findById(id).select(
      "image bigImage personImage sliderImage thirdImage feedbackImage"
    );

    if (!item) {
      throw new ApiError(404, "Item not found");
    }

    // Delete associated images from Cloudinary
    const deleteImages = async (imageField) => {
      if (item[imageField]?.public_Id) {
        await deleteOnCloudinary(item[imageField].public_Id);
      }
    };

    const imageFields = [
      "image",
      "bigImage",
      "personImage",
      "sliderImage",
      "thirdImage",
      "feedbackImage",
    ];
    await Promise.all(imageFields.map(deleteImages));

    // Delete the item from the database
    const deletedItem = await ItemImages.findByIdAndDelete(id);

    if (!deletedItem) {
      throw new ApiError(500, "Failed to delete item from the database");
    }

    return res.status(200).json(
      new ApiResponse(200, deletedItem, "Item deleted successfully")
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
