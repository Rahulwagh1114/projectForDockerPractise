
import Student from "../models/student.js";

 export const allStudents=async(req,res)=>{
    try{
         const studentsList=await Student.find()
         res.status(201).json(studentsList);
    }catch(err){
       res.status(400).json({error:err.message})
    }
}

export const addStudent=async(req,res)=>{
    try{
    const newStudent= new Student(req.body)
     await newStudent.save();
    res.status(201).json(newStudent);
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

export const getStudent=async(req,res)=>{
    try{
     const {id}=req.params;
     const student=await Student.findById(id);
     res.status(201).json(student);
    }catch(err){
      res.status(400).json({error:err.message})
    }
}

export const delStudent=async(req,res)=>{
    try{
        const {id}=req.params;
        const student=await Student.findByIdAndDelete(id);
        res.status(201).json(student);
    }catch(err){
        res.status(400).json({error:err.message})
    }
}