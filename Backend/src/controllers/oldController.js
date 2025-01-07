// exports.updateItemImages = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const {
//       title,
//       sub_title,
//       category,
//       imageDesc,
//       keyInfoHeading,
//       keyInfoDesc,
//       bigImageDesc,
//       personName,
//       sliderHeading,
//       sliderDesc,
//       thirdImageHeading,
//       thirdImageDesc,
//       feedbackHeading,
//       feedbackDesc,
//       feedbackName,
//     } = req.body;

//     const files = req.files; // Access uploaded files

//     // Fetch the existing item to ensure updates are applied correctly
//     const existingItem = await ItemImages.findById(id).select(
//       "image bigImage personImage sliderImage thirdImage feedbackImage"
//     );

//     if (!existingItem) {
//       throw new ApiError(404, "Item not found");
//     }

//     // Prepare updated fields dynamically
//     const updatedFields = {};

//     const bodyFields = {
//       title,
//       sub_title,
//       category,
//       imageDesc,
//       keyInfoHeading,
//       keyInfoDesc,
//       bigImageDesc,
//       personName,
//       sliderHeading,
//       sliderDesc,
//       thirdImageHeading,
//       thirdImageDesc,
//       feedbackHeading,
//       feedbackDesc,
//       feedbackName,
//     };

//     // Include only fields from req.body that are not empty
//     for (const [key, value] of Object.entries(bodyFields)) {
//       if (value && value.trim()) {
//         updatedFields[key] = value;
//       }
//     }

//     const uploadImageToCloudinary = async (file) => {
//       const imageLocalPath = file.path;
//       const uploadResult = await uploadOnCloudinary(imageLocalPath);
//       return {
//         public_Id: uploadResult.public_id,
//         url: uploadResult.secure_url,
//       };
//     };

//     // Include only files from req.files that are provided
//     if (files) {
//       const fieldsToUpdate = [
//         { key: "image", modelKey: "image" },
//         { key: "bigImage", modelKey: "bigImage" },
//         { key: "personImage", modelKey: "personImage" },
//         { key: "sliderImage", modelKey: "sliderImage" },
//         { key: "thirdImage", modelKey: "thirdImage" },
//         { key: "feedbackImage", modelKey: "feedbackImage" },
//       ];

//       for (const { key, modelKey } of fieldsToUpdate) {
//         if (files[key]) {
//           const uploadedImage = await uploadImageToCloudinary(files[key][0]);
//           updatedFields[modelKey] = uploadedImage;

//           // Delete the old image on Cloudinary if a new one is provided
//           const existingImage = existingItem[modelKey];
//           if (existingImage?.public_Id) {
//             await deleteOnCloudinary(existingImage.public_Id);
//           }
//         }
//       }
//     }

//     // Update only the fields that were modified
//     const updatedItem = await ItemImages.findByIdAndUpdate(
//       id,
//       { $set: updatedFields },
//       { new: true }
//     );

//     if (!updatedItem) {
//       throw new ApiError(500, "Failed to update item");
//     }

//     return res
//       .status(200)
//       .json(new ApiResponse(200, updatedItem, "Data update successful"));
//   } catch (error) {
//     const statusCode = error.statusCode || 500;
//     const errorMessage = error.message || "Internal Server Error";
//     res.status(statusCode).json({
//       success: false,
//       error: errorMessage,
//     });
//   }
// };
 // Adjust path if necessary



 // exports.deleteItemById = async (req, res) => {

//   try {
//     const id = req.params.id;

//     // const {
//     //   title,
//     //   sub_title,
//     //   category,
//     //   imageDesc,
//     //   sliderHeading,
//     //   sliderDescriptions,
//     //   feedbackHeading,
//     //   feedbackDescriptions,
//     //   personNames,
//     //   keyInfoHeading,
//     //   keyInfoSubHeading,
//     //   firstImageName,
//     //   firstImageDesc,
//     //   secondImageName,
//     //   secondImageDesc,
//     // } = req.body;

//     // const { image,firstImage, secondImage, firstProfilePhoto, secondProfilePhoto} = req.files; 

//     // const existingMainItems = await ItemImages.findById(id).select(
//     //     "image title sub_title category imageDesc sliderHeading feedbackHeading"
//     // );

//     // const existingBigImageItems = await ItemImages.findById(id).select(
//     //     "firstImageSection.firstImage firstImageSection.description firstImageSection.firstProfilePhoto firstImageSection.name secondImageSection.secondImage secondImageSection.description secondImageSection.secondProfilePhoto secondImageSection.name"
//     // )

//     // if (!existingItem) {
//     //     throw new ApiError(404, "Item not found");
//     // }

//     // const updatedFields = {};

//     // const bodyFields = {
//     //     title,
//     //   sub_title,
//     //   category,
//     //   imageDesc,
//     //   sliderHeading,
//     //   sliderDescriptions,
//     //   feedbackHeading,
//     //   feedbackDescriptions,
//     //   personNames,
//     //   keyInfoHeading,
//     //   keyInfoSubHeading,
//     //   firstImageName,
//     //   firstImageDesc,
//     //   secondImageName,
//     //   secondImageDesc,
//     // }

//     // for (const [key, value] of Object.entries(bodyFields)) {
//     //     if (value && value.trim()) {
//     //       updatedFields[key] = value;
//     //     }
//     // };

//     // const uploadImageToCloudinary = async (file) => {
//     //     const imageLocalPath = file.path;
//     //     const uploadResult = await uploadOnCloudinary(imageLocalPath);
//     //     return {
//     //       public_Id: uploadResult.public_id,
//     //       url: uploadResult.secure_url,
//     //     };
//     // };

//     // if (files) {
//     //     const fieldsToUpdate = [
//     //       { key: "image", modelKey: "image" },
//     //       { key: "bigImage", modelKey: "bigImage" },
//     //       { key: "personImage", modelKey: "personImage" },
//     //       { key: "sliderImage", modelKey: "sliderImage" },
//     //       { key: "thirdImage", modelKey: "thirdImage" },
//     //       { key: "feedbackImage", modelKey: "feedbackImage" },
//     // ];
//     console.log(id)

//     const data = ItemImages.findByIdAndDelete(id)
//     console.log(data)


//   } catch (error) {
//     const statusCode = error.statusCode || 500;
//     const errorMessage = error.message || "Internal Server Error";
//     res.status(statusCode).json({
//       success: false,
//       error: errorMessage,
//     });
//   }
//   // try {
//   //   const id = req.params.id;

//   //   // Fetch the item to get all associated image public IDs
//   //   const item = await ItemImages.findById(id).select(
//   //     "image bigImage personImage sliderImage thirdImage feedbackImage"
//   //   );

//   //   if (!item) {
//   //     throw new ApiError(404, "Item not found");
//   //   }

//   //   // Delete associated images from Cloudinary
//   //   const deleteImages = async (imageField) => {
//   //     if (item[imageField]?.public_Id) {
//   //       await deleteOnCloudinary(item[imageField].public_Id);
//   //     }
//   //   };

//   //   const imageFields = [
//   //     "image",
//   //     "bigImage",
//   //     "personImage",
//   //     "sliderImage",
//   //     "thirdImage",
//   //     "feedbackImage",
//   //   ];
//   //   await Promise.all(imageFields.map(deleteImages));

//   //   // Delete the item from the database
//   //   const deletedItem = await ItemImages.findByIdAndDelete(id);

//   //   if (!deletedItem) {
//   //     throw new ApiError(500, "Failed to delete item from the database");
//   //   }

//   //   return res
//   //     .status(200)
//   //     .json(new ApiResponse(200, deletedItem, "Item deleted successfully"));
//   // } catch (error) {
//   //   const statusCode = error.statusCode || 500;
//   //   const errorMessage = error.message || "Internal Server Error";
//   //   res.status(statusCode).json({
//   //     success: false,
//   //     error: errorMessage,
//   //   });
//   // }
// };







// exports.uploadItemImages = async (req, res) => {
//   try {
//     const { title, sub_title, category, imageDesc,sliderHeading, sliderDescriptions,feedbackHeading, feedbackDescriptions, personNames, keyInfoHeading, keyInfoSubHeading,firstImageName,firstImageDesc,secondImageName,secondImageDesc } = req.body;
//     const { image,firstImage, secondImage, firstProfilePhoto, secondProfilePhoto} = req.files;

//     // Upload images to Cloudinary
//     const imageCloudinary = await uploadOnCloudinary(image[0].path);
//     const firstImageCloudinary = await uploadOnCloudinary(firstImage[0].path);
//     const secondImageCloudinary = await uploadOnCloudinary(secondImage[0].path);
//     const firstProfilePhotoCloudinary = await uploadOnCloudinary(firstProfilePhoto[0].path);
//     const secondProfilePhotoCloudinary = await uploadOnCloudinary(secondProfilePhoto[0].path);

//     const sliderImages = [];
//     if(req.files.sliderImages && sliderDescriptions){
//       const DescriptionsArr = Array.isArray(sliderDescriptions) ? sliderDescriptions : [sliderDescriptions]

//       for (let i=0; i<req.files.sliderImages.length; i++) {
//         const file = req.files.sliderImages[i]
//         const descriptions = DescriptionsArr[i] || "";
//         const result = await uploadOnCloudinary(file.path);
//         sliderImages.push({ 
//           public_Id: result.public_id, 
//           url: result.secure_url,
//           description: descriptions, 
//         });
//       }
//     }

//     const feedback = [];
//     if(req.files.feedbackImages && feedbackDescriptions && personNames){
//       const feebackDescArr = Array.isArray(feedbackDescriptions) ? feedbackDescriptions : [feedbackDescriptions];
//       const feedbackNamesArr = Array.isArray(personNames) ? personNames : [personNames];

//       for (let i=0; i<req.files.feedbackImages.length; i++) {
//         const file = req.files.feedbackImages[i]
//         const descriptions = feebackDescArr[i] || "";
//         const names = feedbackNamesArr[i] || "";
//         const result = await uploadOnCloudinary(file.path);
//         feedback.push({ 
//           public_Id: result.public_id, 
//           url: result.secure_url,
//           description: descriptions, 
//           personName: names, 
//         });
//       }
//     }

//     const keyInfo = [];
//     if(keyInfoHeading && keyInfoSubHeading){
//       const HeadingArr = Array.isArray(keyInfoHeading) ? keyInfoHeading : [keyInfoHeading];
//       const subHeadingArr = Array.isArray(keyInfoSubHeading) ? keyInfoSubHeading : [keyInfoSubHeading];

//       for (let i=0; i<HeadingArr.length; i++) {
//         const headings = HeadingArr[i] || "";
//         const subHeadings = subHeadingArr[i] || "";

//         keyInfo.push({
//           heading:headings,
//           subHeading:subHeadings

//         })
//       }
//     }

//     // Create Big Image object
//     const bigImage = {
//       firstImageSection: {
//         firstImage: {
//           public_Id: firstImageCloudinary.public_id,
//           url: firstImageCloudinary.secure_url,
//         },
//         description:firstImageDesc,
//         firstProfilePhoto: {
//           public_Id: firstProfilePhotoCloudinary.public_id,
//           url: firstProfilePhotoCloudinary.secure_url,
//         },
//         name: firstImageName,
//       },
//       secondImageSection: {
//         secondImage: {
//           public_Id: secondImageCloudinary.public_id,
//           url: secondImageCloudinary.secure_url,
//         },
//         description:secondImageDesc,
//         secondProfilePhoto: {
//           public_Id: secondProfilePhotoCloudinary.public_id,
//           url: secondProfilePhotoCloudinary.secure_url,
//         },
//         name: secondImageName,
//       },
//     };

//     // Save item image to database
//     const newItemImage = new ItemImages({
//       image: {public_Id: imageCloudinary.public_id, url: imageCloudinary.secure_url},
//       title,
//       sub_title,
//       category,
//       imageDesc,
//       bigImage,
//       sliderHeading,
//       sliderImages,
//       feedbackHeading,
//       feedback,
//       keyInfo,
//     });

//     const savedItemImage = await newItemImage.save();
    
//     return res.status(201).json(
//         new ApiResponse(200, savedItemImage, "Project Data created successfully")
//     )
//   } catch (error) {
//     const statusCode = error.statusCode || 500;
//     const errorMessage = error.message || "Internal Server Error";
//     res.status(statusCode).json({
//       success: false,
//       error: errorMessage,
//     });
//   }
// };