
const mongoose=require('mongoose');


const profileSchema=new mongoose.Schema({
    gender:{
        type:String,
        enum:["Male","Female","Transgender"],

    },
    about:{
        type:String,
    },
    contactNumber:{
        type:Number,
        trim:true,
    },
    dateOfBirth:{
        type:Date,
    }
});
module.exports=mongoose.model("Profile",profileSchema);