

const express=require('express');
const router=express.Router();

const {auth}=require('../Middlewares/auth')

const{createBuilding,fetchUserBuildings,uploadPhotos,getAllBuildings,getBuildingDetails} =require('../Controllers/Building');


router.post('/createBuilding',auth,createBuilding);
router.post('/uploadPhotos',auth,uploadPhotos);
router.get('/fetchUserBuildings',auth,fetchUserBuildings);
router.get('/getAllBuildings',getAllBuildings);
router.get('/getAllBuildings',getAllBuildings);
router.get('/getBuildingDetails/:id', getBuildingDetails);

module.exports=router;