import express from "express"
const router=express.Router();
import { addStudent,allStudents, delStudent, getStudent } from "../controllers/student.js";


router.get("/",allStudents);
router.post("/addStudent",addStudent)
router.get("/getStudent/:id",getStudent)
router.delete("/delStudent/:id",delStudent);

export default router;