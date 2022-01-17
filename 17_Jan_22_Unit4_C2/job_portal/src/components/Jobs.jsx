import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getJob} from "../features/actions"


export const Jobs=() => {

const jobs = useSelector((state) => state.jobs);

const dispatch = useDispatch();

useEffect(()=> {
getJobs();
},[])

    const getJobs = () => {
        try {
          fetch("http://localhost:3003/jobs")
            .then((d) => d.json())
            .then((data) => {
              dispatch(getJob(data));
              console.log(data);
            });
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div className="allJobDiv">
        {jobs.map((e,i)=> {
            return (
                <div className="jobDesDiv" key={i}>
                   <p><b>Job Title : </b>{e.title}</p> 
                   <p><b>Company : </b>{e.company}</p>  
                   <p><b>Job Description : </b>{e.description}</p>   
                   <p><b>Salary : </b>{e.salary}</p> 
                   <p><b>Location : </b>{e.location}</p>  
                   <p><b>Job Type : </b>{e.type}</p>  
                </div>
            )
        })}  

        </div>
    )
}