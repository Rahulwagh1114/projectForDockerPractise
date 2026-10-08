import { useEffect } from "react";
import { useState } from "react";

function Student(){
    const [input,setInput]=useState({
       name:"",
       email:"",
    } )
    const Api = import.meta.env.VITE_API_URL;

    const [allStudent,setAllStudent]=useState([]);


    useEffect(()=>{
       async function fetchData() {
          try{
            const response=await fetch(`${Api}/`);
            if(!response.ok) throw new Error(`HTTP error:${response.status}`)
            const data=await response.json();
            setAllStudent(data)
          }catch(err){
            console.log(err);
          }
      }
          fetchData();
    },[])


   async function delStudent(id) {
  try {
    const response = await fetch(`${Api}/delStudent/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    setAllStudent(allStudent.filter((s) => s._id !== id));
  } catch (err) {
    console.log(err);
  }
}

    async function addStudent() {
        try{
         const response= await fetch(`${Api}/addStudent`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(input)
        })
        if(!response.ok) throw new Error(`HTTP Error ${response.status}`)
            const newStudent= await response.json()
            setAllStudent([...allStudent,newStudent])
            setInput({name:"",email:"",id:""})
        }catch(err){
            console.log(err)
        }
    }
    const handleChange=(e)=>{
        setInput({...input,[e.target.id]:e.target.value})
    }
    return(
        <>
        <h1>Student management</h1>
        <div>
            <form>
                <label htmlFor="name">Student Name</label>
                <input type="text" id="name" placeholder="Enter name" value={input.name} onChange={handleChange}/>
                 <label htmlFor="email">Student email</label>
                <input type="email" id="email" placeholder="Enter email" value={input.email} onChange={handleChange} />
                <button type="submit" onClick={addStudent}>Add</button>
            </form>
        </div>

        <div>
            <ul>
            {allStudent.map((student,index)=>(
             <li key={index}>{student.name},{student.email} <button onClick={()=>delStudent(student._id)}>Del</button> </li>
            ))}
            </ul>
        </div>
        </>
    )
}
export default Student;
