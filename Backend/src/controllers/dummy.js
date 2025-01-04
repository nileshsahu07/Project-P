const ItemImages = require("../models/itemImageModel.js");
const ApiError = require("../Utils/apiError.js");
const ApiResponse = require("../Utils/apiResponse.js")
const {uploadOnCloudinary,deleteOnCloudinary} = require("../Utils/cloudinary.js");

// exports.uploadItemImages = async(req,res)=>{
//     try {
//         // console.log(req.body)
//         const {
//           title,
//           sub_title,
//           category,
//           imageDesc,
//           keyInfoHeading,
//           keyInfoDesc,
//           bigImageDesc,
//           personName,
//           sliderHeading,
//           sliderDesc,
//           thirdImageHeading,
//           thirdImageDesc,
//           feedbackHeading,
//           feedbackDesc,
//           feedbackName
//         } = req.body

//         // console.log(req.file)
//         let imageLocalPath;
//         if(req.file && req.file.path){
//              imageLocalPath = req.file.path;
//         }else{
//             new ApiError(400,"Image is required")
//         }

//         // console.log(imageLocalPath)

//         const ImageCloudinaryInfo = await uploadOnCloudinary(imageLocalPath).catch((error) => console.log(error))
        
//         if (!ImageCloudinaryInfo) throw new ApiError(400, "Image file is required!!!.")

//         const ImageCloudinaryURL = ImageCloudinaryInfo.secure_url;

//         const itemImages = await ItemImages.create({
//             image:ImageCloudinaryURL,
//             public_Id:ImageCloudinaryInfo.public_id,
//             title,
//             sub_title,
//             category,
//             imageDesc,
//             keyInfoHeading,
//             keyInfoDesc,
//             bigImageDesc,
//             personName,
//             sliderHeading,
//             sliderDesc,
//             thirdImageHeading,
//             thirdImageDesc,
//             feedbackHeading,
//             feedbackDesc,
//             feedbackName
//         })

//         const uploadedInfo = await ItemImages.findById(itemImages._id)

//         if (!uploadedInfo) throw new ApiError(500, "Images updating failed, please try again")

//         return res.status(201).json(
//             new ApiResponse(200, uploadedInfo, "Image uploaded successfully")
//         )

//     } catch (error) {
//         const statusCode = error.statusCode || 500;
//         const errorMessage = error.message || "Internal Server Error";
//         res.status(statusCode).json({
//             success: false,
//             error: errorMessage
//         });
//     }
// }

// exports.uploadItemImages = async (req, res) => {
//   try {
//       const {
//           title,
//           sub_title,
//           category,
//           imageDesc,
//           keyInfoHeading,
//           keyInfoDesc,
//           bigImageDesc,
//           personName,
//           sliderHeading,
//           sliderDesc,
//           thirdImageHeading,
//           thirdImageDesc,
//           feedbackHeading,
//           feedbackDesc,
//           feedbackName,
//       } = req.body;

//       const files = req.files; // Access all uploaded files

//       if (!files || Object.keys(files).length === 0) {
//           throw new ApiError(400, "At least one image file is required!");
//       }

//       const uploadImageToCloudinary = async (file) => {
//           try {
//               const imageLocalPath = file.path;
//               const uploadResult = await uploadOnCloudinary(imageLocalPath);
//               return {
//                   public_Id: uploadResult.public_id,
//                   url: uploadResult.secure_url,
//               };
//           } catch (error) {
//               throw new ApiError(500, Failed to upload image: ${error.message});
//           }
//       };

//       // Upload each image field to Cloudinary
//       const uploadedImages = {
//           image: files.image ? await uploadImageToCloudinary(files.image[0]) : undefined,
//           bigImage: files.bigImage ? await uploadImageToCloudinary(files.bigImage[0]) : undefined,
//           personImage: files.personImage ? await uploadImageToCloudinary(files.personImage[0]) : undefined,
//           sliderImage: files.sliderImage ? await uploadImageToCloudinary(files.sliderImage[0]) : undefined,
//           thirdImage: files.thirdImage ? await uploadImageToCloudinary(files.thirdImage[0]) : undefined,
//           feedbackImage: files.feedbackImage ? await uploadImageToCloudinary(files.feedbackImage[0]) : undefined,
//       };

//       // Create the item with uploaded image URLs and other details
//       const itemImages = await ItemImages.create({
//           ...uploadedImages,
//           image: uploadedImages.image?.url,
//           public_Id: uploadedImages.image?.public_Id,
//           title,
//           sub_title,
//           category,
//           imageDesc,
//           keyInfoHeading,
//           keyInfoDesc,
//           bigImage: uploadedImages.bigImage,
//           bigImageDesc,
//           personImage: uploadedImages.personImage,
//           personName,
//           sliderHeading,
//           sliderImage: uploadedImages.sliderImage,
//           sliderDesc,
//           thirdImage: uploadedImages.thirdImage,
//           thirdImageHeading,
//           thirdImageDesc,
//           feedbackHeading,
//           feedbackDesc,
//           feedbackImage: uploadedImages.feedbackImage,
//           feedbackName,
//       });

//       const uploadedInfo = await ItemImages.findById(itemImages._id);

//       if (!uploadedInfo) throw new ApiError(500, "Image creation failed, please try again.");

//       return res.status(201).json(
//           new ApiResponse(200, uploadedInfo, "Images uploaded successfully")
//       );
//   } catch (error) {
//       const statusCode = error.statusCode || 500;
//       const errorMessage = error.message || "Internal Server Error";
//       res.status(statusCode).json({
//           success: false,
//           error: errorMessage,
//       });
//   }
// };

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

      if (!files || Object.keys(files).length === 0) {
          throw new ApiError(400, "At least one image file is required!");
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

      if (!uploadedInfo) throw new ApiError(500, "Image creation failed, please try again.");

      return res.status(201).json(
          new ApiResponse(200, uploadedInfo, "Images uploaded successfully")
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



// exports.getItemImages = async(req,res)=>{

//     try {
//         const ItemData = await ItemImages.find()
    
//         if(!ItemData) throw new ApiError(400,"Image and Data not found")
    
//         return res.status(201).json(
//             new ApiResponse(200, ItemData, "data fetched successfully")
//         )
//     } catch (error) {
//         const statusCode = error.statusCode || 500;
//         const errorMessage = error.message || "Internal Server Error";
//         res.status(statusCode).json({
//             success: false,
//             error: errorMessage
//         });
//     }
// }

// exports.updateItemImages = async (req, res) => {
//     try {
//     //   console.log(req.params.id);
//       const id = req.params.id;
  
//       const { title, sub_title, category } = req.body;
//     //   console.log(title);
  
//       const imageLocalPath = req.file?.path;
//     //   console.log(imageLocalPath);
  
//       if (!(title || sub_title || category || imageLocalPath)) {
//         throw new ApiError(400, "At least one field is required to update");
//       }
  
//       let updatedFields = { title, sub_title, category };
  
//       let imageToDelete = null;
  
//       // If there's a new image, upload it to Cloudinary
//       if (imageLocalPath) {
//         const image = await uploadOnCloudinary(imageLocalPath);
//         // console.log(image);
  
//         if (!image.url) {
//           throw new ApiError(400, "Error while uploading image");
//         }
  
//         // Fetch the current item image to get the public_Id for deletion
//         const itemImage = await ItemImages.findById(id).select("image public_Id");
//         // console.log(itemImage.public_Id);
  
//         imageToDelete = itemImage?.public_Id;
  
//         // Add the new image data to the fields to be updated
//         updatedFields.image = image.secure_url;
//         updatedFields.public_Id = image.public_Id;
//       }
  
//       // Update the item image data
//       const updatedItemImagesData = await ItemImages.findByIdAndUpdate(
//         id,
//         { $set: updatedFields },
//         { new: true }
//       );
  
//       // Delete the old image from Cloudinary if a new image was uploaded
//       if (imageToDelete && updatedFields.public_Id) {
//         await deleteOnCloudinary(imageToDelete);
//       }
  
//       return res.status(200).json(
//         new ApiResponse(200, updatedItemImagesData, "Data update successful")
//       );
//     } catch (error) {
//       const statusCode = error.statusCode || 500;
//       const errorMessage = error.message || "Internal Server Error";
//       res.status(statusCode).json({
//         success: false,
//         error: errorMessage,
//       });
//     }
//   };
  
// exports.updateItemImages = async (req, res) => {
//   try {
//       const id = req.params.id;
//       const {
//           title,
//           sub_title,
//           category,
//           imageDesc,
//           keyInfoHeading,
//           keyInfoDesc,
//           bigImageDesc,
//           personName,
//           sliderHeading,
//           sliderDesc,
//           thirdImageHeading,
//           thirdImageDesc,
//           feedbackHeading,
//           feedbackDesc,
//           feedbackName,
//       } = req.body;

//       const files = req.files; // Access uploaded files
//       const updatedFields = {
//           title,
//           sub_title,
//           category,
//           imageDesc,
//           keyInfoHeading,
//           keyInfoDesc,
//           bigImageDesc,
//           personName,
//           sliderHeading,
//           sliderDesc,
//           thirdImageHeading,
//           thirdImageDesc,
//           feedbackHeading,
//           feedbackDesc,
//           feedbackName,
//       };

//       if (!(Object.keys(updatedFields).some((key) => updatedFields[key]) || files)) {
//           throw new ApiError(400, "At least one field or image is required to update");
//       }

//       // Fetch the current item images to get public IDs for deletion
//       const existingItem = await ItemImages.findById(id).select(
//           "image public_Id bigImage personImage sliderImage thirdImage feedbackImage"
//       );

//       if (!existingItem) {
//           throw new ApiError(404, "Item not found");
//       }

//       const uploadImageToCloudinary = async (file) => {
//           try {
//               const imageLocalPath = file.path;
//               const uploadResult = await uploadOnCloudinary(imageLocalPath);
//               return {
//                   public_Id: uploadResult.public_id,
//                   url: uploadResult.secure_url,
//               };
//           } catch (error) {
//               throw new ApiError(500, Failed to upload image: ${error.message});
//           }
//       };

//       // Handle image uploads and prepare fields for update
//       if (files) {
//           const fieldsToUpdate = [
//               { key: "image", modelKey: "image" },
//               { key: "bigImage", modelKey: "bigImage" },
//               { key: "personImage", modelKey: "personImage" },
//               { key: "sliderImage", modelKey: "sliderImage" },
//               { key: "thirdImage", modelKey: "thirdImage" },
//               { key: "feedbackImage", modelKey: "feedbackImage" },
//           ];

//           for (const { key, modelKey } of fieldsToUpdate) {
//               if (files[key]) {
//                   const uploadedImage = await uploadImageToCloudinary(files[key][0]);
//                   updatedFields[modelKey] = modelKey === "image" ? uploadedImage.url : uploadedImage;

//                   // Mark existing image for deletion
//                   const existingImage = existingItem[modelKey];
//                   if (existingImage?.public_Id) {
//                       await deleteOnCloudinary(existingImage.public_Id);
//                   }
//               }
//           }
//       }

//       // Update the item with new data
//       const updatedItem = await ItemImages.findByIdAndUpdate(
//           id,
//           { $set: updatedFields },
//           { new: true }
//       );

//       if (!updatedItem) {
//           throw new ApiError(500, "Failed to update item");
//       }

//       return res.status(200).json(
//           new ApiResponse(200, updatedItem, "Data update successful")
//       );
//   } catch (error) {
//       const statusCode = error.statusCode || 500;
//       const errorMessage = error.message || "Internal Server Error";
//       res.status(statusCode).json({
//           success: false,
//           error: errorMessage,
//       });
//   }
// };

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
      const updatedFields = {
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

      const existingItem = await ItemImages.findById(id).select(
          "image bigImage personImage sliderImage thirdImage feedbackImage"
      );

      if (!existingItem) {
          throw new ApiError(404, "Item not found");
      }

      const uploadImageToCloudinary = async (file) => {
          const imageLocalPath = file.path;
          const uploadResult = await uploadOnCloudinary(imageLocalPath);
          return {
              public_Id: uploadResult.public_id,
              url: uploadResult.secure_url,
          };
      };

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

                  const existingImage = existingItem[modelKey];
                  if (existingImage?.public_Id) {
                      await deleteOnCloudinary(existingImage.public_Id);
                  }
              }
          }
      }

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



// exports.deleteItemById = async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const id = req.params.id;

//     // Fetch the item to get details (including image public_Id)
//     const item = await ItemImages.findById(id).select("public_Id");

//     if (!item) {
//       throw new ApiError(404, "Item not found");
//     }

//     // Delete the associated image from Cloudinary, if it exists
//     if (item.public_Id) {
//       await deleteOnCloudinary(item.public_Id);
//     }

//     // Delete the item from the database
//     const deletedItem = await ItemImages.findByIdAndDelete(id);

//     if (!deletedItem) {
//       throw new ApiError(500, "Failed to delete item from the database");
//     }

//     return res.status(200).json(
//       new ApiResponse(200, deletedItem, "Item deleted successfully")
//     );
//   } catch (error) {
//     const statusCode = error.statusCode || 500;
//     const errorMessage = error.message || "Internal Server Error";
//     res.status(statusCode).json({
//       success: false,
//       error: errorMessage,
//     });
//   }
// };


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