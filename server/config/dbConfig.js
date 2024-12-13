import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
        })
        logger.info("MongoDB connection SUCCESS");
    }catch(error){
        logger.error(`Error in connectDB:`, error?.message);
        process.exit(1);
    }
}

export default connectDB;