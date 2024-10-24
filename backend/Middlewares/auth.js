

const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=async(req,res,next)=>{
    try{
            const token=req.body.token || req.cookies.Token || req.header("Authorization")?.replace("Bearer ","");
            console.log("token is ",token);
            if(!token)
            {
                return res.status(401).json({
                    success:false,
                    message:"Token not found.",
                })
            }
            try{
                    const decode=jwt.verify(token,process.env.JWT_SECRET);
                    console.log(decode);
                    req.user=decode;
            }
            catch(error){

                return res.status(401).json({
                    success:false,
                    message:"Error while decoding token.",
                    error:error.message,
                })
        
            }
            next();
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error while verifying token."
        })
    }
}




exports.isStudent=async(req,res,next)=>{
    try{
            if(req.user.accountType!=="Student")
            {
                return res.status(401).json({
                    success:false,
                    message:"This is a protected route for students.",
                    
                })
            }
            next();
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"User role can't be verified."
        })
    }
}
exports.isOwner=async(req,res,next)=>{
    try{
            if(req.user.accountType!=="Owner")
            {
                return res.status(401).json({
                    success:false,
                    message:"This is a protected route for owner.",
                    
                })
            }
            next();
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"User role can't be verified."
        })
    }
}




