const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const sliderImageSchema = new Schema({
    sliderImage:{
        type:{
            public_Id:String,
            url:String
        },
        required:true
    },
    sliderTitle:{
        type:String,
        required:true
    },
    sliderDesc:{
        type:String,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MainImage",
        required:true
    }
});

const SliderImages = model("SliderImage",sliderImageSchema)

module.exports = SliderImages