

const mongoose=require('mongoose');
const mailSender=require('../Utils/mailSender');
const emailTemplate=require('../mail/verificationMail')
const otpSchema=new mongoose.Schema({


    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
  
})

async function sendVerificationMail(email,otp){
    
    try{
        const mailResponse=await mailSender(
            email,
            "Verification mail from Shelter Seek",
            emailTemplate(otp),
        );
        console.log("Email sent successfully",mailResponse);
    }
    catch(error){
        console.log("Error while sending mail");
        console.error(error.message);
    }
}
otpSchema.pre("save",async function(next){

    if(this.isNew){
        await sendVerificationMail(this.email,this.otp);
    }
    next();
})
module.exports=mongoose.model('Otp',otpSchema);