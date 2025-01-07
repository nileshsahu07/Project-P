// const mongoose = require("mongoose")

// const {Schema,model} = mongoose;

// const itemImageSchema = new Schema({
//     image:{
//         type:{
//             public_Id:String,
//             url:String
//         },
//         // required:true
//     },

//     title:{
//         type:String,
//         // required:true
//     },

//     sub_title:{
//         type:String,
//         // required:true
//     },

//     category: { 
//         type: String,
//         // required:true
//     },
//     imageDesc:{
//         type:String,
//         // required:true
//     },

//     keyInfoHeading:{
//         type:String,
//         // required:true
//     },

//     keyInfoDesc:{
//         type:String,
//         // required:true
//     },

//     bigImage:{
//         type:{
//             public_Id:String,
//             url:String  //cloudinary url
//         },
//         // required:true
//     },

//     bigImageDesc:{
//         type:String,
//         // required:true
//     },

//     personImage:{
//         type:{
//             public_Id:String,
//             url:String  //cloudinary url
//         },
//         // required:true
//     },

//     personName:{
//         type:String,
//         // required:true
//     },
//     sliderHeading:{
//         type:String,
//         // required:true
//     },

//     sliderImage:{
//         type:{
//             public_Id:String,
//             url:String  //cloudinary url
//         },
//         // required:true
//     },

//     sliderDesc:{
//         type:String,
//         // required:true
//     },
//     thirdImage:{
//         type:{
//             public_Id:String,
//             url:String  //cloudinary url
//         },
//         // required:true
//     },
    
//     thirdImageHeading:{
//         type:String,
//         // required:true
//     },

//     thirdImageDesc:{
//         type:String,
//         // required:true
//     },
//     feedbackHeading:{
//         type:String,
//         // required:true
//     },
//     feedbackDesc:{
//         type:String,
//         // required:true
//     },

//     feedbackImage:{
//         type:{
//             public_Id:String,
//             url:String  //cloudinary url
//         },
//         // required:true
//     },

//     feedbackName:{
//         type:String,
//         // required:true
//     },

//     uploadDate: { 
//         type: Date, 
//         default: Date.now 
//     },
// })


// const ItemImages = model("Images",itemImageSchema)

// module.exports = ItemImages


const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const bigImageSchema = new Schema({
    firstImageSection:{
        firstImage:{
            type:{
                public_Id:String,
                url:String
            }
        },
        description:{
            type:String
        },
        firstProfilePhoto:{
            type:{
                public_Id:String,
                url:String
            }
        },
        name:{
            type:String
        }
    },
    secondImageSection:{
        secondImage:{
            type:{
                public_Id:String,
                url:String
            }
        },
        description:{
            type:String
        },
        secondProfilePhoto:{
            type:{
                public_Id:String,
                url:String
            }
        },
        name:{
            type:String
        }
    }
})

const sliderImageSchema = new Schema({
    public_Id: {
      type: String,
    //   required: true,
    },
    url: {
      type: String,
    //   required: true,
    },
    description: {
      type: String, // One-line description for the image
    //   required: true,
    },
});

const feedbackSchema= new Schema({
    public_Id: {
      type: String,
    //   required: true,
    },
    url: {
      type: String,
    //   required: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    personName:{
        type:String,
        // required:true
    }
})

const keyInfoSchema = new Schema({
    heading:{
        type:String,
        // required:true,
    },
    subHeading:{
        type:String,
        // required:true
    }
})

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

    bigImage:bigImageSchema,

    sliderHeading:{
        type:String,
    },

    sliderImages:[sliderImageSchema],

    feedbackHeading:{
        type :String,
        // required:true,
    },

    feedback:[feedbackSchema],

    keyInfo:[keyInfoSchema],

    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
})


const ItemImages = model("Images",itemImageSchema)

module.exports = ItemImages