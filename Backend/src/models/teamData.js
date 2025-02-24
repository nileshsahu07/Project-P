const mongoose = require("mongoose")

const {Schema,model} = mongoose;

const teamMemberCardSchema = new Schema({
    teamMemberImage:{
        type:{
            public_Id:String,
            url:String
        }
    },
    teamMemberName:{
        type:String,
        required:true
    },
    teamMemberRole:{
        type:String,
        required:true
    },
    teamMemberDesc:{
        type:String,
        required:true
    },
    teamMemberPara:{
        type:String,
        required:true
    },
    teamMemberEmail:{
        type:String,
        required:true
    },
    teamMemberLinkedin:{
        type:String,
        required:true
    },
});

const TeamMemberInfo = model("TeamMember",teamMemberCardSchema)

module.exports = TeamMemberInfo;