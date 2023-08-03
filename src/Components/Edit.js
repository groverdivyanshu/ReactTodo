import React, { useContext, useEffect, useState } from 'react'
import { Datacontext } from '../Proivder/Dataprovider';
import { useNavigate, useParams } from 'react-router-dom';


export default function Edit() {
    const{Edittasks}=useContext(Datacontext);
    const navigate=useNavigate();
    const {id}=useParams();
    console.log("params",useParams());
    const{tasks,setTasks}=useContext(Datacontext);
    const[task, setTask]=useState("");
    const[description,setDescription]=useState("");
    const[completed,setCompleted]=useState(false);
    const [priority, setPriority] = useState("");
   
   
    // Edit the task
const Edittask=tasks.find((item)=>{
   
    console.log("b",id);
    if(item.id===Number(id))
    {
        return item;
    }
})
console.log("edit",Edittask);
useEffect(()=>{
if(Edittask)
{
    setTask(Edittask.task);
    setDescription(Edittask.description);
    setCompleted(Edittask.completed);
    setPriority(Edittask.priority);
}
},[Edittask])

function handleSubmit(e)
{
e.preventDefault();

Edittasks(Number(id),{task,description,completed,priority})
// Navigate to home page
navigate('/')
}

  return (
    <>
          {/* Heading of the page */}
          <h1>TODO APP!</h1>

{/* Division created to provide styling of section to the todo*/}
<div className="section">

{/* Form for to write the blog */}
    <form onSubmit={handleSubmit}>

        {/* Row component to create a row for first input field */}
        <Row label="Task">
                <input className="input"
                        placeholder="Enter the task  here.."
                        value={task}
                        onChange={(e)=>setTask(e.target.value)}
                        />

                       
        </Row >

        {/* Row component to create a row for Text area field */}
        <Row label="Description">
                <textarea className="input content"
                        placeholder="Description of the goes here.."
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        
                        />
        </Row >
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
 </select>

        {/* Button to submit the form */}            
        <button className = "btn" >SaveChanges</button>
    </form>
             
</div>

<hr/>  
    </>
  )
}
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
         {props.children}
        <hr />
        </>
    )
}