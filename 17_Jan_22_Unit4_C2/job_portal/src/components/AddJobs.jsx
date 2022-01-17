import { useDispatch } from "react-redux";
import {addJob} from "../features/actions"


export const AddJobs = () => {

const dispatch = useDispatch();

    const addJobs = () => { 
          fetch("http://localhost:3002/todos", {
            method: "POST",
            body: JSON.stringify(),
            headers: { "Content-Type": "application/json" },
          })
            .then((d) => d.json())
            .then((res) => {
             dispatch(addJob)
              alert("New job added successfully");
            })
            .catch((err) => {
              console.log(err);
            });
      };

    return (
        <div id="jobDiv"> 
        <form onSubmit={addJobs}>
            <input type="text" name="title" placeholder="Job title"  required/>
            <input type="text" name="company"   placeholder="Company" required/>
            <input type="number" name="salary" placeholder="Salary" required/>
            <input type="text" name="description" placeholder="Job description" required/>
            <input type="text" name="location" placeholder="Location" required/>
            <input type="text" name="type" placeholder="Job type" required/>
            <input type="submit"  name="submit" value="Add Job"/>
        </form>

        </div>
    )
}