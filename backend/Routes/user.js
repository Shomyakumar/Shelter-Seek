

const express=require('express');
const router=express.Router();

const {auth}=require('../Middlewares/auth')
const{signup,login,sendotp,userBookings} =require ('../Controllers/Auth')


router.post('/signup',signup);
router.post('/login',login);
router.post('/sendotp',sendotp);
router.post('/userBookings',auth,userBookings);

module.exports=router;