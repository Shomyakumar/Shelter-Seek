
const cloudinary=require('cloudinary').v2;

const uploadImageToCloudinary=async(file,folder,height,quality)=>{

    const options={folder};

    if(height)
        options.height=height;
    if(quality)
        options.quality=quality;

    const response=await cloudinary.uploader.upload(file.tempFilePath,options);
    return response;
}

module.exports=uploadImageToCloudinary;