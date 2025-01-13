const express = require("express");
const upload = require("../middlewares/multer.js");
const itemImage = require("../controllers/itemImage.js");
const verifyJWT = require("../middlewares/auth.js");
const admin = require("../middlewares/admin.js");
const router = express.Router();

router.post(
  "/uploadItemImage",
//   verifyJWT,
//   admin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "oneSideImage", maxCount: 1 },
    { name: "firstImage", maxCount: 1 },
    { name: "firstProfilePhoto", maxCount: 1 },
    { name: "secondImage", maxCount: 1 },
    { name: "secondProfilePhoto", maxCount: 1 },
    { name: "sliderImages", maxCount: 10 },
    { name: "feedbackImages", maxCount: 10 },
  ]),
  itemImage.uploadItemImages
);

router.put(
  "/updateItemImage/:id",
//   verifyJWT,
//   admin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "oneSideImage", maxCount: 1 },
    { name: "firstImage", maxCount: 1 },
    { name: "firstProfilePhoto", maxCount: 1 },
    { name: "secondImage", maxCount: 1 },
    { name: "secondProfilePhoto", maxCount: 1 },
    { name: "sliderImages", maxCount: 10 },
    { name: "feedbackImages", maxCount: 10 },
  ]),
  itemImage.updateItemImages
);
router.get("/getItemImage/:id?", itemImage.getItemImages);

router.delete(
  "/deleteItemImage/:id",
//   verifyJWT,
//   admin,
  itemImage.deleteItemById
);

module.exports = router;
