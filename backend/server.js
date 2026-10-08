
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import studentRoutes from "./routes/student.js"
import cors from "cors";
const port=8080;
const app=express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://project-for-docker-practise.vercel.app"
    ],
    credentials: true
}));
app.use(express.json())

const mongoDb=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL)
     console.log("database is connected")
   }catch(err){
    console.log(err)
   }
}

await  mongoDb();

app.use("/api/students",studentRoutes);

app.listen(port,()=>{
    console.log("Server running on port 8080")
})

