

const express=require('express');
const router=express.Router();

const {auth}=require('../Middlewares/auth')

const{createBuilding,fetchUserBuildings,uploadPhotos,
    getAllBuildings,getBuildingDetails,deleteBuilding,getBookedUsers,
    updateBuildingDetails} =require('../Controllers/Building');



router.post('/createBuilding',auth,createBuilding);
router.post('/uploadPhotos',auth,uploadPhotos);
router.get('/fetchUserBuildings',auth,fetchUserBuildings);
router.get('/getAllBuildings',getAllBuildings);
router.get('/getBuildingDetails/:id', getBuildingDetails);
router.put('/updateBuilding/:id',updateBuildingDetails);
router.post('/deleteBuilding', deleteBuilding);
router.get('/bookedUsers/:id',getBookedUsers);

module.exports=router;