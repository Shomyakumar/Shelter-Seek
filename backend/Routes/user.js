

const express=require('express');
const router=express.Router();


const{signup,login,sendotp} =require ('../Controllers/Auth')


router.post('/signup',signup);
router.post('/login',login);
router.post('/sendotp',sendotp);

module.exports=router;