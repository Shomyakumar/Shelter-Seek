


const express=require('express');
const app=express();

const cookieParser=require('cookie-parser');
const fileUpload=require('express-fileupload');
const cors = require("cors");

app.use(
	cors({
		origin:"http://localhost:3000",
		// origin:"https://shelter-seek-eight-khaki.vercel.app",
		credentials:true,
	})
);

require('dotenv').config();
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))


const dbConnect=require('./Config/Database');
const cloudinaryConnect=require('./Config/Cloudinary');

dbConnect();
cloudinaryConnect();

const userRoutes=require('./Routes/user');
const profileRoutes=require('./Routes/profile');
const buildingRoutes=require('./Routes/Building');
const paymentRoutes=require('./Routes/Payments');
app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/profile',profileRoutes);
app.use('/api/v1/building',buildingRoutes);
app.use('/api/v1/payment',paymentRoutes);

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`Server is runing on port ${PORT}`);
})
