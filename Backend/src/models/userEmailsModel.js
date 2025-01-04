const { default: mongoose } = require("mongoose");

const {model,Schema} = mongoose;

const userEmailSchema = new Schema({
    userEmail:{
        type:String
    },
})

const UserEmail =  model("UserEmail",userEmailSchema)

module.exports = UserEmail;