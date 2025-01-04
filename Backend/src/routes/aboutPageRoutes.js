const express = require("express")
const aboutController = require("../controllers/aboutController.js");
const upload = require("../middlewares/multer.js")
const verifyJWT = require("../middlewares/auth.js")
const admin = require("../middlewares/admin.js")
const router = express.Router();


router.post("/uploadAboutData",verifyJWT,admin,upload.fields([
    { name: 'bigImage', maxCount: 1 },
    { name: 'publicationImages', maxCount: 1 },
    { name: 'employeeImage', maxCount: 1 },
]),aboutController.uploadAboutPageData);

router.get("/getAboutData",aboutController.getAboutPageData);

router.put("/updateAboutData/:id",verifyJWT,admin,upload.fields([
    { name: 'bigImage', maxCount: 1 },
    { name: 'publicationImages', maxCount: 1 },
    { name: 'employeeImage', maxCount: 1 },
]),aboutController.updateAboutPageData);

router.delete("/deleteAboutData/:id",verifyJWT,admin,aboutController.deleteAboutPageData);

// router.post("/userEmail",aboutController.userEmail);

module.exports = router;