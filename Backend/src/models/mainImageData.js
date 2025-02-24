const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const mainImageSchema = new Schema({
    mainImage:{
        type:{
            public_Id:String,
            url:String
        },
        // required:true
    },

    title:{
        type:String,
        required:true
    },

    sub_title:{
        type:String,
        required:true
    },

    category: { 
        type: String,
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

    teamMembers:[{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"TeamMember",
            required:true
        },
        quote:{
            type:String,
            required:true
        }
    }]
});

const MainImages = model("MainImage",mainImageSchema)

module.exports = MainImages;