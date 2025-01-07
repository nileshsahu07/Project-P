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

    bigImage:[
        {
            firstImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            secondImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            }
        }
    ],

    bigImageDesc:[
        {
            firstImageDesc:{
                type:String,
            },
            secondImageDesc:{
                type:String
            }
        }
    ],

    personImage:[
        {
            firstImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            secondImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            }
        }
    ],

    personName:[
        {
            firstPersonName:{
                type:String,
            },
            secondPersonName:{
                type:String
            }
        }
    ],

    sliderHeading:{
        type:String,
        // required:true
    },

    sliderImage:[
        {
            firstImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            secondImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            thirdImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            forthImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            fifthImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
        }
    ],

    sliderDesc:[
        {
            firstDesc:{
                type:String,
            },
            secondDesc:{
                type:String
            },
            thirdDesc:{
                type:String,
            },
            forthDesc:{
                type:String
            },
            fifthDesc:{
                type:String
            }
        }
    ],
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
    feedbackDesc:[
        {
            firstDesc:{
                type:String,
            },
            secondDesc:{
                type:String
            },
            thirdDesc:{
                type:String,
            },
            forthDesc:{
                type:String
            },
        }
    ],

    feedbackImage:[
        {
            firstImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            secondImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            thirdImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
            forthImage:{
                type:{
                    public_Id:String,
                    url:String
                }
            },
        }
    ],
    feedbackName:[
        {
            firstPersonName:{
                type:String,
            },
            secondPersonName:{
                type:String
            },
            thirdPersonName:{
                type:String,
            },
            forthPersonName:{
                type:String
            }
        }
    ],

    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
})


const ItemImages = model("Images",itemImageSchema)

module.exports = ItemImages