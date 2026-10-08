
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import studentRoutes from "./routes/student.js"
import cors from "cors";
const port=8080;
const app=express();

app.use(cors())
app.use(express.json())

const mongoDb=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
     console.log("database is connected")
   }catch(err){
    console.log(err)
   }
}

app.use("/api/students",studentRoutes);

app.listen(port,"0.0.0.0",()=>{
    console.log("Server running on port 8080")
    mongoDb();
})

