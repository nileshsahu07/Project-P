const express = require("express");
const upload = require("../middlewares/multer.js");
const itemImage = require("../controllers/itemImage.js");
const verifyJWT = require("../middlewares/auth.js");
const admin = require("../middlewares/admin.js");
const { uploadMainImageData, getMainImage, updateMainImageData, deleteMainImageData } = require("../controllers/mainImageController.js");
const { uploadOtherImageData, updateOtherImageData, deleteOtherImageData } = require("../controllers/otherImagesController.js");
const { uploadSliderImageData, updateSliderImageData, deleteSliderImageData} = require("../controllers/sliderImageController.js");
const { uploadKeyInfoData, updateKeyInfoData, deleteKeyInfoData } = require("../controllers/keyInfoController.js");
const { uploadTeamMemberData, updateTeamMemberData, getTeamMemberInfo, deleteTeamMemberData } = require("../controllers/teamController.js");
const router = express.Router();

router.post("/uploadMainImageData",
upload.single("mainImage"),uploadMainImageData);

router.get("/getMainImageData/:id?",verifyJWT,admin, getMainImage);
router.put("/updateMainImageData/:id",upload.single("mainImage"),updateMainImageData);
router.delete("/deleteMainImageData/:id",deleteMainImageData);

router.post("/uploadKeyInfoData",uploadKeyInfoData);
router.put("/updateKeyInfoData/:id",updateKeyInfoData);
router.delete("/deleteKeyInfoData/:id",deleteKeyInfoData);

router.post("/uploadTeamMemberData",upload.single("teamMemberImage"),uploadTeamMemberData);
router.get("/getTeamMemberData/:id?",getTeamMemberInfo);
router.put("/updateTeamMemberData/:id",upload.single("teamMemberImage"),updateTeamMemberData);
router.delete("/deleteTeamMemberData/:id",deleteTeamMemberData);

router.post("/uploadOtherImage",upload.fields([
    { name:"firstBigImage",maxCount:1 },
    { name:"secondBigImage",maxCount:1 },
    { name:"sideImage",maxCount:1 }
]),uploadOtherImageData);

router.put("/updateOtherImages/:id",upload.fields([
    { name:"firstBigImage",maxCount:1 },
    { name:"secondBigImage",maxCount:1 },
    { name:"sideImage",maxCount:1 }
]),updateOtherImageData);

router.delete("/deleteOtherImages/:id",deleteOtherImageData);

router.post("/uploadSliderImages",upload.fields([
    { name:"sliderImage",maxCount:10 }
]),uploadSliderImageData);
router.put("/updateSliderImages/:id",upload.single("sliderImage"),updateSliderImageData);
router.delete("/deleteSliderImages/:id",deleteSliderImageData);

module.exports = router;
