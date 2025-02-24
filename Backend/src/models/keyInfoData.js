const mongoose = require("mongoose")

const {Schema,model} = mongoose;


const keyInfoSchema = new Schema({
    heading:{
        type:String,
        required:true,
    },
    subHeading:{
        type:String,
        required:true
    },

    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MainImage",
        required:true
    }
});

const KeyInfo = model("KeyInfo",keyInfoSchema)

module.exports = KeyInfo;