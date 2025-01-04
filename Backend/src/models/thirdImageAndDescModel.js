const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const thirdImageAndDescSchema = new Schema({
    Image:{
        type:{
            public_Id:String,
            url:String  //cloudinary url
        },
        required:true
    },
    
    imageHeading:{
        type:String,
        required:true
    },

    imageDesc:{
        type:String,
        required:true
    },

    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
})

const ThirdImageAndDesc = model("ThirdImageDesc",thirdImageAndDescSchema)

module.exports = ThirdImageAndDesc;