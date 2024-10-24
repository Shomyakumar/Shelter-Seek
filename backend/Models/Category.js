const mongoose=require('mongoose');

const categorySchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    buildings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Building'
    }],

})

module.exports=mongoose.model("Category",categorySchema);