const express=require('express');
const router=express.Router();


const {capturePayment,verifyPayment}=require('../Controllers/payments');
const {auth,isStudent} =require('../Middlewares/auth');
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth,isStudent, verifyPayment)

module.exports = router


