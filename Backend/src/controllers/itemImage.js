const ItemImages = require("../models/itemImageModel.js");
const ApiError = require("../Utils/apiError.js");
const ApiResponse = require("../Utils/apiResponse.js");
const {
  uploadOnCloudinary,
  deleteOnCloudinary,
} = require("../Utils/cloudinary.js");

exports.uploadItemImages = async (req, res) => {
  try {
    const { title, sub_title, category, imageDesc, oneSideHeading,oneSideDesc, sliderHeading, sliderDescriptions, feedbackHeading, feedbackDescriptions, personNames, keyInfoHeading, keyInfoSubHeading,teamInfoHeading,teamInfoSubHeading, firstImageName, firstImageDesc, secondImageName, secondImageDesc } = req.body;
    const { image,oneSideImage, firstImage, secondImage, firstProfilePhoto, secondProfilePhoto } = req.files;

    const newItemImage = new ItemImages();

    // Upload images to Cloudinary if they exist
    if (image && image[0]) {
      const imageCloudinary = await uploadOnCloudinary(image[0].path);
      newItemImage.image = { public_Id: imageCloudinary.public_id, url: imageCloudinary.secure_url };
    }

    if (oneSideImage && oneSideImage[0]) {
      const oneSideImageCloudinary = await uploadOnCloudinary(oneSideImage[0].path);
      // console.log(oneSideImageCloudinary)
      newItemImage.oneSideImage = { public_Id: oneSideImageCloudinary.public_id, url: oneSideImageCloudinary.secure_url };
    }

    if (firstImage && firstImage[0]) {
      const firstImageCloudinary = await uploadOnCloudinary(firstImage[0].path);
      newItemImage.bigImage = { firstImageSection: { firstImage: { public_Id: firstImageCloudinary.public_id, url: firstImageCloudinary.secure_url } } };
    }

    if (secondImage && secondImage[0]) {
      const secondImageCloudinary = await uploadOnCloudinary(secondImage[0].path);
      if (!newItemImage.bigImage) newItemImage.bigImage = {};
      newItemImage.bigImage.secondImageSection = { secondImage: { public_Id: secondImageCloudinary.public_id, url: secondImageCloudinary.secure_url } };
    }

    if (firstProfilePhoto && firstProfilePhoto[0]) {
      const firstProfilePhotoCloudinary = await uploadOnCloudinary(firstProfilePhoto[0].path);
      if (!newItemImage.bigImage) newItemImage.bigImage = {};
      newItemImage.bigImage.firstImageSection.firstProfilePhoto = { public_Id: firstProfilePhotoCloudinary.public_id, url: firstProfilePhotoCloudinary.secure_url };
    }

    if (secondProfilePhoto && secondProfilePhoto[0]) {
      const secondProfilePhotoCloudinary = await uploadOnCloudinary(secondProfilePhoto[0].path);
      if (!newItemImage.bigImage) newItemImage.bigImage = {};
      newItemImage.bigImage.secondImageSection.secondProfilePhoto = { public_Id: secondProfilePhotoCloudinary.public_id, url: secondProfilePhotoCloudinary.secure_url };
    }

    if (firstImageDesc) {
      if (!newItemImage.bigImage) newItemImage.bigImage = {};
      newItemImage.bigImage.firstImageSection.description = firstImageDesc;
    }

    if (firstImageName) {
      if (!newItemImage.bigImage) newItemImage.bigImage = {};
      newItemImage.bigImage.firstImageSection.name = firstImageName;
    }

    if (secondImageDesc) {
      if (!newItemImage.bigImage) newItemImage.bigImage = {};
      newItemImage.bigImage.secondImageSection.description = secondImageDesc;
    }

    if (secondImageName) {
      if (!newItemImage.bigImage) newItemImage.bigImage = {};
      newItemImage.bigImage.secondImageSection.name = secondImageName;
    }

    if (title) newItemImage.title = title;
    if (sub_title) newItemImage.sub_title = sub_title;
    if (category) newItemImage.category = category;
    if (imageDesc) newItemImage.imageDesc = imageDesc;
    if (oneSideHeading) newItemImage.oneSideHeading = oneSideHeading;
    if (oneSideDesc) newItemImage.oneSideDesc = oneSideDesc;
    if (sliderHeading) newItemImage.sliderHeading = sliderHeading;
    if (feedbackHeading) newItemImage.feedbackHeading = feedbackHeading;

    const sliderImages = [];
    if (req.files.sliderImages || sliderDescriptions) {
      const DescriptionsArr = Array.isArray(sliderDescriptions) ? sliderDescriptions : [sliderDescriptions];
      for (let i = 0; i < req.files.sliderImages.length; i++) {
        const file = req.files.sliderImages[i];
        const descriptions = DescriptionsArr[i] || "";
        const result = await uploadOnCloudinary(file.path);
        sliderImages.push({
          public_Id: result.public_id,
          url: result.secure_url,
          description: descriptions,
        });
      }
    }
    if (sliderImages.length > 0) newItemImage.sliderImages = sliderImages;

    const feedback = [];
    if (req.files.feedbackImages || feedbackDescriptions || personNames) {
      const feebackDescArr = Array.isArray(feedbackDescriptions) ? feedbackDescriptions : [feedbackDescriptions];
      const feedbackNamesArr = Array.isArray(personNames) ? personNames : [personNames];
      for (let i = 0; i < req.files.feedbackImages.length; i++) {
        const file = req.files.feedbackImages[i];
        const descriptions = feebackDescArr[i] || "";
        const names = feedbackNamesArr[i] || "";
        const result = await uploadOnCloudinary(file.path);
        feedback.push({
          public_Id: result.public_id,
          url: result.secure_url,
          description: descriptions,
          personName: names,
        });
      }
    }
    if (feedback.length > 0) newItemImage.feedback = feedback;

    const keyInfo = [];
    if (keyInfoHeading || keyInfoSubHeading) {
      const HeadingArr = Array.isArray(keyInfoHeading) ? keyInfoHeading : [keyInfoHeading];
      const subHeadingArr = Array.isArray(keyInfoSubHeading) ? keyInfoSubHeading : [keyInfoSubHeading];
      for (let i = 0; i < HeadingArr.length; i++) {
        const headings = HeadingArr[i] || "";
        const subHeadings = subHeadingArr[i] || "";
        keyInfo.push({
          heading: headings,
          subHeading: subHeadings,
        });
      }
    }
    if (keyInfo.length > 0) newItemImage.keyInfo = keyInfo;

    const teamInfo = [];
    if (teamInfoHeading || teamInfoSubHeading) {
      const HeadingArr = Array.isArray(teamInfoHeading) ? teamInfoHeading : [teamInfoHeading];
      const subHeadingArr = Array.isArray(teamInfoSubHeading) ? teamInfoSubHeading : [teamInfoSubHeading];
      for (let i = 0; i < HeadingArr.length; i++) {
        const headings = HeadingArr[i] || "";
        const subHeadings = subHeadingArr[i] || "";
        teamInfo.push({
          heading: headings,
          subHeading: subHeadings,
        });
      }
    }
    if (teamInfo.length > 0) newItemImage.teamInfo = teamInfo;

    const savedItemImage = await newItemImage.save();

    return res.status(201).json(
      new ApiResponse(200, savedItemImage, "Project Data created successfully")
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
    const {id} = req.params;

    if(id){
      const itemById = await ItemImages.findById(id)

      if(!itemById){
        throw new ApiError(404, "No data found by id");
      }
      return res
      .status(200)
      .json(new ApiResponse(200, itemById, "Data fetched successfully"));
    }
    
    const itemData = await ItemImages.find();

    if (!itemData || itemData.length === 0) {
      throw new ApiError(404, "No data found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, itemData, "Data fetched successfully"));
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
    const { id } = req.params;
    const { title, sub_title, category, imageDesc, oneSideHeading,oneSideDesc,sliderHeading, sliderDescriptions, feedbackHeading, feedbackDescriptions, personNames, keyInfoHeading, keyInfoSubHeading,teamInfoHeading, teamInfoSubHeading, firstImageName, firstImageDesc, secondImageName, secondImageDesc } = req.body;
    const { image, oneSideImage, firstImage, secondImage, firstProfilePhoto, secondProfilePhoto } = req.files;

    // Find the item by ID
    const item = await ItemImages.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update only the fields that are provided in the request
    if (title) item.title = title;
    if (sub_title) item.sub_title = sub_title;
    if (category) item.category = category;
    if (imageDesc) item.imageDesc = imageDesc;
    if (oneSideHeading) item.oneSideHeading = oneSideHeading;
    if (oneSideDesc) item.oneSideDesc = oneSideDesc;
    if (sliderHeading) item.sliderHeading = sliderHeading;
    if (feedbackHeading) item.feedbackHeading = feedbackHeading;

    if (image && image[0]) {
      await deleteOnCloudinary(item.image.public_Id);
      const imageCloudinary = await uploadOnCloudinary(image[0].path);
      item.image = { public_Id: imageCloudinary.public_id, url: imageCloudinary.secure_url };
    }
    if (oneSideImage && oneSideImage[0]) {
      await deleteOnCloudinary(item.oneSideImage.public_Id);
      const oneSideImageCloudinary = await uploadOnCloudinary(oneSideImage[0].path);
      item.oneSideImage = { public_Id: oneSideImageCloudinary.public_id, url: oneSideImageCloudinary.secure_url };
    }

    if (firstImage && firstImage[0]) {
      await deleteOnCloudinary(item.bigImage.firstImageSection.firstImage.public_Id);
      const firstImageCloudinary = await uploadOnCloudinary(firstImage[0].path);
      item.bigImage.firstImageSection.firstImage = { public_Id: firstImageCloudinary.public_id, url: firstImageCloudinary.secure_url };
    }
    if (firstProfilePhoto && firstProfilePhoto[0]) {
      await deleteOnCloudinary(item.bigImage.firstImageSection.firstProfilePhoto.public_Id);
      const firstProfilePhotoCloudinary = await uploadOnCloudinary(firstProfilePhoto[0].path);
      item.bigImage.firstImageSection.firstProfilePhoto = { public_Id: firstProfilePhotoCloudinary.public_id, url: firstProfilePhotoCloudinary.secure_url };
    }
    if (firstImageDesc) item.bigImage.firstImageSection.description = firstImageDesc;
    if (firstImageName) item.bigImage.firstImageSection.name = firstImageName;

    if (secondImage && secondImage[0]) {
      await deleteOnCloudinary(item.bigImage.secondImageSection.secondImage.public_Id);
      const secondImageCloudinary = await uploadOnCloudinary(secondImage[0].path);
      item.bigImage.secondImageSection.secondImage = { public_Id: secondImageCloudinary.public_id, url: secondImageCloudinary.secure_url };
    }
    if (secondProfilePhoto && secondProfilePhoto[0]) {
      await deleteOnCloudinary(item.bigImage.secondImageSection.secondProfilePhoto.public_Id);
      const secondProfilePhotoCloudinary = await uploadOnCloudinary(secondProfilePhoto[0].path);
      item.bigImage.secondImageSection.secondProfilePhoto = { public_Id: secondProfilePhotoCloudinary.public_id, url: secondProfilePhotoCloudinary.secure_url };
    }
    if (secondImageDesc) item.bigImage.secondImageSection.description = secondImageDesc;
    if (secondImageName) item.bigImage.secondImageSection.name = secondImageName;

    if (req.files.sliderImages || sliderDescriptions) {
      const DescriptionsArr = Array.isArray(sliderDescriptions) ? sliderDescriptions : [sliderDescriptions];
      
      for (const img of item.sliderImages) {
        await deleteOnCloudinary(img.public_Id);
      }
      item.sliderImages = []; // Clear existing slider images

      for (let i = 0; i < req.files.sliderImages.length; i++) {
        const file = req.files.sliderImages[i];
        const descriptions = DescriptionsArr[i] || "";
        const result = await uploadOnCloudinary(file.path);
        item.sliderImages.push({
          public_Id: result.public_id,
          url: result.secure_url,
          description: descriptions,
        });
      }
    }

    if (req.files.feedbackImages || feedbackDescriptions || personNames) {
      const feebackDescArr = Array.isArray(feedbackDescriptions) ? feedbackDescriptions : [feedbackDescriptions];
      const feedbackNamesArr = Array.isArray(personNames) ? personNames : [personNames];

      for (const fb of item.feedback) {
        await deleteOnCloudinary(fb.public_Id);
      }
      item.feedback = []; // Clear existing feedback

      for (let i = 0; i < req.files.feedbackImages.length; i++) {
        const file = req.files.feedbackImages[i];
        const descriptions = feebackDescArr[i] || "";
        const names = feedbackNamesArr[i] || "";
        const result = await uploadOnCloudinary(file.path);
        item.feedback.push({
          public_Id: result.public_id,
          url: result.secure_url,
          description: descriptions,
          personName: names,
        });
      }
    }

    if (keyInfoHeading || keyInfoSubHeading) {
      const HeadingArr = Array.isArray(keyInfoHeading) ? keyInfoHeading : [keyInfoHeading];
      const subHeadingArr = Array.isArray(keyInfoSubHeading) ? keyInfoSubHeading : [keyInfoSubHeading];
      item.keyInfo = []; // Clear existing key info

      for (let i = 0; i < HeadingArr.length; i++) {
        const headings = HeadingArr[i] || "";
        const subHeadings = subHeadingArr[i] || "";

        item.keyInfo.push({
          heading: headings,
          subHeading: subHeadings,
        });
      }
    }
    if (teamInfoHeading || teamInfoSubHeading) {
      const HeadingArr = Array.isArray(teamInfoHeading) ? teamInfoHeading : [teamInfoHeading];
      const subHeadingArr = Array.isArray(teamInfoSubHeading) ? teamInfoSubHeading : [teamInfoSubHeading];
      item.teamInfo = []; // Clear existing key info

      for (let i = 0; i < HeadingArr.length; i++) {
        const headings = HeadingArr[i] || "";
        const subHeadings = subHeadingArr[i] || "";

        item.teamInfo.push({
          heading: headings,
          subHeading: subHeadings,
        });
      }
    }

    const updatedItem = await item.save();

    return res.status(200).json(
      new ApiResponse(200, updatedItem, "Item updated successfully")
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
    const { id } = req.params;

    // Find the item by ID
    const item = await ItemImages.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Delete all associated images from Cloudinary
    if (item.image && item.image.public_Id) {
      await deleteOnCloudinary(item.image.public_Id);
    }

    if (item.oneSideImage && item.oneSideImage.public_Id) {
      await deleteOnCloudinary(item.oneSideImage.public_Id);
    }

    if (item.bigImage) {
      if (item.bigImage.firstImageSection.firstImage && item.bigImage.firstImageSection.firstImage.public_Id) {
        await deleteOnCloudinary(item.bigImage.firstImageSection.firstImage.public_Id);
      }
      if (item.bigImage.firstImageSection.firstProfilePhoto && item.bigImage.firstImageSection.firstProfilePhoto.public_Id) {
        await deleteOnCloudinary(item.bigImage.firstImageSection.firstProfilePhoto.public_Id);
      }
      if (item.bigImage.secondImageSection.secondImage && item.bigImage.secondImageSection.secondImage.public_Id) {
        await deleteOnCloudinary(item.bigImage.secondImageSection.secondImage.public_Id);
      }
      if (item.bigImage.secondImageSection.secondProfilePhoto && item.bigImage.secondImageSection.secondProfilePhoto.public_Id) {
        await deleteOnCloudinary(item.bigImage.secondImageSection.secondProfilePhoto.public_Id);
      }
    }

    for (const img of item.sliderImages) {
      if (img.public_Id) {
        await deleteOnCloudinary(img.public_Id);
      }
    }

    for (const fb of item.feedback) {
      if (fb.public_Id) {
        await deleteOnCloudinary(fb.public_Id);
      }
    }

    // Delete the item from the database
    const deletedData = await ItemImages.findByIdAndDelete(id);

    return res.status(200).json(
      new ApiResponse(200, deletedData, "Item deleted successfully")
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



