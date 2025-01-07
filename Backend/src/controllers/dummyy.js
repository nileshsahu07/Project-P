const ItemImages = require("../models/itemImageModel");

exports.updateItemImages = async (req, res) => {
  try {
    const id = req.params.id;

    // const {
    //   title,
    //   sub_title,
    //   category,
    //   imageDesc,
    //   sliderHeading,
    //   sliderDescriptions,
    //   feedbackHeading,
    //   feedbackDescriptions,
    //   personNames,
    //   keyInfoHeading,
    //   keyInfoSubHeading,
    //   firstImageName,
    //   firstImageDesc,
    //   secondImageName,
    //   secondImageDesc,
    // } = req.body;

    // const { image,firstImage, secondImage, firstProfilePhoto, secondProfilePhoto} = req.files; 

    // const existingMainItems = await ItemImages.findById(id).select(
    //     "image title sub_title category imageDesc sliderHeading feedbackHeading"
    // );

    // const existingBigImageItems = await ItemImages.findById(id).select(
    //     "firstImageSection.firstImage firstImageSection.description firstImageSection.firstProfilePhoto firstImageSection.name secondImageSection.secondImage secondImageSection.description secondImageSection.secondProfilePhoto secondImageSection.name"
    // )

    // if (!existingItem) {
    //     throw new ApiError(404, "Item not found");
    // }

    // const updatedFields = {};

    // const bodyFields = {
    //     title,
    //   sub_title,
    //   category,
    //   imageDesc,
    //   sliderHeading,
    //   sliderDescriptions,
    //   feedbackHeading,
    //   feedbackDescriptions,
    //   personNames,
    //   keyInfoHeading,
    //   keyInfoSubHeading,
    //   firstImageName,
    //   firstImageDesc,
    //   secondImageName,
    //   secondImageDesc,
    // }

    // for (const [key, value] of Object.entries(bodyFields)) {
    //     if (value && value.trim()) {
    //       updatedFields[key] = value;
    //     }
    // };

    // const uploadImageToCloudinary = async (file) => {
    //     const imageLocalPath = file.path;
    //     const uploadResult = await uploadOnCloudinary(imageLocalPath);
    //     return {
    //       public_Id: uploadResult.public_id,
    //       url: uploadResult.secure_url,
    //     };
    // };

    // if (files) {
    //     const fieldsToUpdate = [
    //       { key: "image", modelKey: "image" },
    //       { key: "bigImage", modelKey: "bigImage" },
    //       { key: "personImage", modelKey: "personImage" },
    //       { key: "sliderImage", modelKey: "sliderImage" },
    //       { key: "thirdImage", modelKey: "thirdImage" },
    //       { key: "feedbackImage", modelKey: "feedbackImage" },
    // ];
    console.log(id)


  } catch (error) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
    });
  }
};
