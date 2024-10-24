
const mongoose=require('mongoose');
require('dotenv').config();

const URL=process.env.DATABASE_URL;

const dbConnect=()=>{

    mongoose.connect(URL)
    .then(()=>{
        console.log("Database connection successful")
    })
    .catch((error)=>{
        console.log("Error in database connection");
        console.error(error);
        process.exit(1);
    })
}

module.exports=dbConnect;