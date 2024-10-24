

const User=require('../Models/User')
const uploadImageToCloudinary=require('../Utils/imageUploader');
require("dotenv").config();

exports.updateProfilePicture=async(req,res)=>{
    try{

        console.log(req.user);
        const id=req.user.id;

        const image=req.files.profileImage;
        if(!image)
        {
            return res.status(404).json({
                success: false,
                message: "image not found",
            });
        }
        const uploadedImage=await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
        const updatedUser=await User.findByIdAndUpdate(id,{image:uploadedImage.secure_url},{new:true});

        res.status(200).json({
            success:true,
            message:"profile picture uploaded successfully.",
            data:updatedUser,
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Error while updating profile picture."

        })
    }
}