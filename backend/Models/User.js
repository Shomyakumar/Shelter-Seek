

const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    accountType:{
        type:String,
        required:true,
        enum:["Student","Admin","Owner"],
    },
    profileDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile',
        required:true,
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    image: {
        type: String,
        required: true,
    },
})
module.exports=mongoose.model("User",userSchema);