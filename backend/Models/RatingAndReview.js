

const mongoose=require('mongoose');

const ratingAndReviewSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    rating:{
        type:Number,
        rquired:true,
    },
    review:{
        type:String,
        required:true,
    },
    building: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Building",
		index: true,
	},

})

module.exports=mongoose.model('RatingAndReview',ratingAndReviewSchema);