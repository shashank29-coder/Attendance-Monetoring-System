const mongoose = require('mongoose');


const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to db");
    }
        catch(err){
            console.error("Error connecting to db:", err);
        }
    }
module.exports = connectdb;