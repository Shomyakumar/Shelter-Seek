


const User=require('../Models/User');
const Otp=require('../Models/Otp')
const Profile=require('../Models/Profile')

const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const otpGenerator = require("otp-generator");

function generatePassword(password) {
    const salt = "shomya"
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return genHash
}
function validPassword(password, hash) {
    const salt = "shomya"
    const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === checkHash
}

exports.signup=async(req,res)=>{
    try{
            console.log("signup ",req.body);
            const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;

            if(!firstName || !lastName ||!email ||!password ||!confirmPassword || !accountType||!otp)
            {
                return res.status(400).json({
                    success:false,
                    message:"All fields are required",
                })
            }
            if(password!==confirmPassword)
            {
                return res.status(400).json({
                    success:false,
                    message:"Passwords do not match",
                })
            }
            const existingUser=await User.findOne({email});

            if(existingUser)
            {
                return res.status(400).json({
                    success:false,
                    message:"User already exist",
                })
            }
            // verify otp
            const recentOtp=await Otp.find({email}).sort({createdAt:-1}).limit(1).exec();
            console.log("recent otp is",recentOtp);
            if(recentOtp[0].otp!==otp)
            {
                return res.status(400).json({
                    success:false,
                    message:"You entered wrong otp",
                })
            }
            // hash password
            const hashedPassword=generatePassword(confirmPassword);
            const profile=await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contact:null,
            })

            const newUser=await User.create(
                {
                    firstName,
                    lastName,
                    email,
                    password:hashedPassword,
                    accountType,
                    profileDetails:profile._id,
                    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
                }
            );
            newUser.password="*"
            return res.status(200).json({
                success:false,
                message:"User created successfully",
                newUser,
            })

           

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error while user signup",
            error:error.message,
        })
    }
}
exports.login=async(req,res)=>{
    try{

        const{email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        let existingUser=await User.findOne({email});

        if(!existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User does not exist, please signup",
            })
        }
        const matched=validPassword(password, existingUser.password);

        if(!matched)
        {
            return res.status(400).json({
                success:false,
                message:"You entered wrong password",
            })
        }
        
        
        const payload={
            email:existingUser.email,
            accountType:existingUser.accountType,
            id:existingUser._id,
        }
        const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"});

        existingUser=existingUser.toObject();
        existingUser.token=token;
        existingUser.password=undefined;
        
        const options={
            expires:new Date(Date.now()+ 3*24* 60*60*1000),
            httpsOnly:true,
        };

        res.cookie("Token",token,options).status(200).json({
            success:true,
            message:"User logged in successfully.",
            user:existingUser,
            token,
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error while user login",
            error:error.message,
        })
    }
}

exports.sendotp=async(req,res)=>{
    console.log("hitting controller");
    
    try{
            const{email}=req.body;
            // console.log(req.body);
            if(!email){
                return res.status(400).json({
                    success:false,
                    message:"Email not found"
                })
            }
            const existingUser=await User.findOne({email});
            if(existingUser)
            {
                return res.status(403).json({
                    success:false,
                    message:"User already exist.",                    
                })
            }

            var otp=otpGenerator.generate(6,{

                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            
            
            const result=await Otp.create({email,otp});
            
		    res.status(200).json({
		    	success: true,
		    	message: `OTP Sent Successfully`,
		    	result,
		    });
    }
    catch(error)
    {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error while sending otp",
            
        })
    }
}




 exports.userBookings=async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the authenticate middleware sets req.user

        const user = await User.findById(userId)
            .populate('bookings') // Populates the bookings from the Building model
            .exec();

        console.log("user is",user)
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ 
            bookings: user.bookings });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error.' });
    }
};

