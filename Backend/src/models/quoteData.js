const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const quoteSchema = new Schema({
    quote:{
        type:String,
        required:true
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MainImage",
        required:true
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    }
});

const Quote = model("SliderImage",quoteSchema)

module.exports = Quote;