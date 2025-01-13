const AboutPage = require("../models/aboutPageModel.js")
const ApiError = require("../Utils/apiError.js");
const ApiResponse = require("../Utils/apiResponse.js")
const {uploadOnCloudinary,deleteOnCloudinary} = require("../Utils/cloudinary.js");

exports.uploadAboutPageData = async function(req,res,next){
    try {
        const {
            headings,
            firstParas,
            secondParas,
            employeeNames,
            employeeRoles,
            employeeDescs,
            employeeParas,
            employeeEmails,
            employeeLinkedins,
            companyName,
            companyCoNum,
            companyAdd
        } = req.body;

        const files = req.files;

        const bodyFields = [
            headings,
            firstParas,
            secondParas,
            companyName,
            companyCoNum,
            companyAdd
        ];
        const hasBodyField = bodyFields.some((field) => field && field.trim().length > 0);
        const hasFileField = files && Object.keys(files).length > 0;

        if(!hasBodyField && !hasFileField){
            throw new ApiError(400,"at least one field is required !!!.");
        }

        const uploadImageToCloudinary = async (file) => {
            const imageLocalPath = file.path;
            const uploadResult = await uploadOnCloudinary(imageLocalPath);
            return {
                public_Id: uploadResult.public_id,
                url: uploadResult.secure_url,
            };
        };

        const employeeCard = [];

        if(files?.employeeImages && employeeNames && employeeRoles && employeeDescs && employeeParas && employeeEmails && employeeLinkedins ){
            const NamesArr = Array.isArray(employeeNames) ? employeeNames : [employeeNames];
            const RolesArr = Array.isArray(employeeRoles) ? employeeRoles : [employeeRoles];
            const DescsArr = Array.isArray(employeeDescs) ? employeeDescs : [employeeDescs];
            const ParasArr = Array.isArray(employeeParas) ? employeeParas : [employeeParas];
            const EmailsArr = Array.isArray(employeeEmails) ? employeeEmails : [employeeEmails];
            const LinkedinsArr = Array.isArray(employeeLinkedins) ? employeeLinkedins : [employeeLinkedins];

            for(let i=0; i<files?.employeeImages.length; i++){
                const file = files?.employeeImages[i];
                const names = NamesArr[i] || "";
                const roles = RolesArr[i] || "";
                const descs = DescsArr[i] || "";
                const paras = ParasArr[i] || "";
                const emails = EmailsArr[i] || "";
                const linkedins = LinkedinsArr[i] || "";

                const result = await uploadOnCloudinary(file.path)
                employeeCard.push({
                    public_Id: result.public_id,
                    url: result.secure_url,
                    employeeName: names,
                    employeeRole : roles,
                    employeeDesc : descs,
                    employeePara : paras,
                    employeeEmail : emails,
                    employeeLinkedin : linkedins,
                })
            }
        }

        const uploadedImages = {
            bigImage: files.bigImage ? await uploadImageToCloudinary(files.bigImage[0]) : undefined,
            publicationImages: files.publicationImages ? await uploadImageToCloudinary(files.publicationImages[0]) : undefined,
            // employeeImage: files.employeeImage ? await uploadImageToCloudinary(files.employeeImage[0]) : undefined,
        };

        const createdData = await AboutPage.create({
            bigImage: uploadedImages.bigImage,
            publicationImages: uploadedImages.publicationImages, 
            employeeCard,
            headings,
            firstParas,
            secondParas,
            companyName,
            companyCoNum,
            companyAdd,
        })

        const uploadedData = await AboutPage.findById(createdData._id)

        if(!uploadedData) throw new ApiError(500,"About page data creation failed, please try again.")

        return res.status(201).json(
            new ApiResponse(200,uploadedData,"About Page data uploaded successfully")
        )
        
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const errorMessage = error.message || "Internal Server Error";
        res.status(statusCode).json({
            success: false,
            error: errorMessage,
        });
    }
}

exports.getAboutPageData = async (req, res) => {
    try {
      const aboutData = await AboutPage.find();
  
      if (!aboutData || aboutData.length === 0) {
        throw new ApiError(404, "No data found");
      }
  
      return res.status(200).json(
        new ApiResponse(200, aboutData, "Data fetched successfully")
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

exports.updateAboutPageData = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            headings,
            firstParas,
            secondParas,
            employeeName,
            employeeRole,
            employeeDesc,
            employeeParas,
            EmailLink,
            LinkedinLink,
            InstaLink,
            companyName,
            companyCoNum,
            companyAdd,
        } = req.body;

        const files = req.files; // Access uploaded files

        // Fetch the existing data to ensure updates are applied correctly
        const existingData = await AboutPage.findById(id).select(
            "bigImage publicationImages employeeImage"
        );

        if (!existingData) {
            throw new ApiError(404, "About data not found");
        }

        // Prepare updated fields dynamically
        const updatedFields = {};

        // Include only fields from req.body that are not empty
        const bodyFields = {
            headings,
            firstParas,
            secondParas,
            employeeName,
            employeeRole,
            employeeDesc,
            employeeParas,
            EmailLink,
            LinkedinLink,
            InstaLink,
            companyName,
            companyCoNum,
            companyAdd,
        };

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
                { key: "bigImage", modelKey: "bigImage" },
                { key: "publicationImages", modelKey: "publicationImages" },
                { key: "employeeImage", modelKey: "employeeImage" },
            ];

            for (const { key, modelKey } of fieldsToUpdate) {
                if (files[key]) {
                    const uploadedImage = await uploadImageToCloudinary(files[key][0]);
                    updatedFields[modelKey] = uploadedImage;

                    // Delete the old image on Cloudinary if a new one is provided
                    const existingImage = existingData[modelKey];
                    if (existingImage?.public_Id) {
                        await deleteOnCloudinary(existingImage.public_Id);
                    }
                }
            }
        }

        // Update only the fields that were modified
        const updatedData = await AboutPage.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true }
        );

        if (!updatedData) {
            throw new ApiError(500, "Failed to update data");
        }

        return res.status(200).json(
            new ApiResponse(200, updatedData, "Data update successful")
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

exports.deleteAboutPageData = async (req, res) => {
    try {
      const id = req.params.id;
  
      // Fetch the item to get all associated image public IDs
      const aboutData = await AboutPage.findById(id).select(
        "bigImage publicationImages employeeImage"
      );
  
      if (!aboutData) {
        throw new ApiError(404, "data not found");
      }
  
      // Delete associated images from Cloudinary
      const deleteImages = async (imageField) => {
        if (aboutData[imageField]?.public_Id) {
          await deleteOnCloudinary(aboutData[imageField].public_Id);
        }
      };
  
      const imageFields = [
        "bigImage",
        "publicationImages",
        "employeeImage"
      ];
      await Promise.all(imageFields.map(deleteImages));
  
      // Delete the item from the database
      const deletedItem = await AboutPage.findByIdAndDelete(id);
  
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