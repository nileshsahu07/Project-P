const cloudinary = require("cloudinary")
const fs = require("fs")

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,

    cloud_name:"dusvarmgw",
    api_key: 373154371666665,
    api_secret: "0wl4BSfkmJ-EY6De1F7-0etfWhg",
});

const uploadOnCloudinary = async (localFilePath) => {
    // console.log(localFilePath);
    try {
        if (!localFilePath) return null;

        //upload to cloudinary if localFilePath exists
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // console.log("file uploaded to cloudinary", result.url);

        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return error;
    }
};

const deleteOnCloudinary = async (public_id, resource_type="image") => {
    try {
        if (!public_id) return null;

        //delete file from cloudinary
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: `${resource_type}`
        });
    } catch (error) {
        return error;
        console.log("delete on cloudinary failed", error);
    }
};

module.exports = {uploadOnCloudinary,deleteOnCloudinary};
