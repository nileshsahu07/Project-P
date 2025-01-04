const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const itemImageSchema = new Schema({
    image:{
        type:{
            public_Id:String,
            url:String
        },
        // required:true
    },

    title:{
        type:String,
        // required:true
    },

    sub_title:{
        type:String,
        // required:true
    },

    category: { 
        type: String,
        // required:true
    },
    imageDesc:{
        type:String,
        // required:true
    },

    keyInfoHeading:{
        type:String,
        // required:true
    },

    keyInfoDesc:{
        type:String,
        // required:true
    },

    bigImage:{
        type:{
            public_Id:String,
            url:String  //cloudinary url
        },
        // required:true
    },

    bigImageDesc:{
        type:String,
        // required:true
    },

    personImage:{
        type:{
            public_Id:String,
            url:String  //cloudinary url
        },
        // required:true
    },

    personName:{
        type:String,
        // required:true
    },
    sliderHeading:{
        type:String,
        // required:true
    },

    sliderImage:{
        type:{
            public_Id:String,
            url:String  //cloudinary url
        },
        // required:true
    },

    sliderDesc:{
        type:String,
        // required:true
    },
    thirdImage:{
        type:{
            public_Id:String,
            url:String  //cloudinary url
        },
        // required:true
    },
    
    thirdImageHeading:{
        type:String,
        // required:true
    },

    thirdImageDesc:{
        type:String,
        // required:true
    },
    feedbackHeading:{
        type:String,
        // required:true
    },
    feedbackDesc:{
        type:String,
        // required:true
    },

    feedbackImage:{
        type:{
            public_Id:String,
            url:String  //cloudinary url
        },
        // required:true
    },

    feedbackName:{
        type:String,
        // required:true
    },

    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
})


const ItemImages = model("Images",itemImageSchema)

module.exports = ItemImages