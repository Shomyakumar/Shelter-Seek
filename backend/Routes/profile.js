

const express=require('express');
const router=express.Router();

const {auth}=require('../Middlewares/auth')

const{updateProfilePicture} =require ('../Controllers/Profile')


router.post('/update-pic',auth,updateProfilePicture);


module.exports=router;