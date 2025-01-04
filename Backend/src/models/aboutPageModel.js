const { default: mongoose } = require("mongoose");

const {model,Schema} = mongoose;

const aboutPageSchema = new Schema({
    headings:{
        type:String,
    },
    firstParas:{
        type:String
    },
    bigImage:{
        type:{
            public_Id:String,
            url:String
        }
    },
    secondParas:{
        type:String,
    },
    publicationImages:{
        type:{
            public_Id:String,
            url:String
        }
    },
    employeeName:{
        type:String,
    },
    employeeRole:{
        type:String,
    },
    employeeImage:{
        type:{
            public_Id:String,
            url:String
        }
    },
    employeeDesc:{
        type:String
    },
    employeeParas:{
        type:String
    },
    EmailLink:{
        type:String
    },
    LinkedinLink:{
        type:String
    },
    InstaLink:{
        type:String
    },
    companyName:{
        type:String
    },
    companyCoNum:{
        type:String
    },
    companyAdd:{
        type:String
    }

})

const AboutPage =  model("AboutPage",aboutPageSchema)

module.exports = AboutPage