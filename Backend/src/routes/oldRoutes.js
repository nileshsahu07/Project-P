// router.post("/uploadItemImage",verifyJWT,admin,upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'bigImage', maxCount: 1 },
//     { name: 'personImage', maxCount: 1 },
//     { name: 'sliderImage', maxCount: 1 },
//     { name: 'thirdImage', maxCount: 1 },
//     { name: 'feedbackImage', maxCount: 1 },
// ]),itemImage.uploadItemImages)


// router.put(
//   "/updateItemImage/:id",
//   verifyJWT,
//   admin,
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "bigImage", maxCount: 1 },
//     { name: "personImage", maxCount: 1 },
//     { name: "sliderImage", maxCount: 1 },
//     { name: "thirdImage", maxCount: 1 },
//     { name: "feedbackImage", maxCount: 1 },
//   ]),
//   itemImage.updateItemImages
// );