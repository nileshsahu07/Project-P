const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const otherImageSchema = new Schema({
    firstBigImage:{
        type:{
            public_Id:String,
            url:String
        },
        required:true
    },

    secondBigImage:{
        type:{
            public_Id:String,
            url:String
        },
        required:true
    },

    sideImage:{
        type:{
            public_Id:String,
            url:String
        },
        required:true
    },

    sideImageTitle:{
        type:String,
        required:true
    },

    sideImageDesc: { 
        type: String,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MainImage",
        required:true
    }
});

const OtherImages = model("OtherImage",otherImageSchema)

module.exports = OtherImages;