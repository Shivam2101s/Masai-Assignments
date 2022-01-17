import { useState } from "react";
import { useDispatch } from "react-redux";
import {addJob} from "../features/actions"


export const AddJobs = () => {
const [form,setForm] = useState([]);    

const handleChange = (e) => {
    const {name,value} = e.target;
    setForm({
        ...form,
        [name]: value,
    })
 }

const dispatch = useDispatch();

    const addJobs = () => { 
          fetch("http://localhost:3003/jobs", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
          })
            .then((d) => d.json())
            .then((res) => {
              alert("New job added successfully");
              dispatch(addJob(res)); 
            })
            .catch((err) => {
              console.log(err);
            });
      };

    return (
        <div class="jobDiv"> 
        <form onSubmit={addJobs}>
            <input type="text" onChange={handleChange} name="title" placeholder="Job title"  required/>
            <input type="text" onChange={handleChange} name="company"   placeholder="Company" required/>
            <input type="number" onChange={handleChange} name="salary" placeholder="Salary" required/>
            <input type="text" onChange={handleChange} name="description" placeholder="Job description" required/>
            <input type="text" onChange={handleChange} name="location" placeholder="Location" required/>
            <input type="text" onChange={handleChange} name="type" placeholder="Job type" required/>
            <input type="submit" onChange={handleChange} id="addJobBtn" name="submit" value="Add Job"/>
        </form>

        </div>
    )
}