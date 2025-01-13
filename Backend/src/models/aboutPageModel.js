const { default: mongoose } = require("mongoose");

const {model,Schema} = mongoose;

const employeeCardSchema = new Schema({
    public_Id : {
        type:String
    },
    url:{
        type:String
    },
    employeeName:{
        type:String
    },
    employeeRole:{
        type:String
    },
    employeeDesc:{
        type:String
    },
    employeePara:{
        type:String
    },
    employeeEmail:{
        type:String
    },
    employeeLinkedin:{
        type:String
    }
})

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

    employeeCard:[employeeCardSchema],

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