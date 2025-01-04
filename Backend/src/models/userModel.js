const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {Schema,model} = mongoose;

const userSchema = new Schema({
    userName:{
        type:String,
        required:[true,"userName is required"],
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    token:{
        type:String
    },
    role:{
        type:String,
        enum:['admin','user'],
        default: 'admin'
    },
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,10)
    return next()
})

userSchema.methods = {
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
    },
    generateToken: function(){
        return jwt.sign(
            {
                _id: this._id,
                email:this.email,
                userName:this.userName,
                role:this.role
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRY
            }
        )
    }
}


const User = model("User",userSchema)

module.exports = User