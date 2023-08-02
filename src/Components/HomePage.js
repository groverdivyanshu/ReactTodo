import React, { useContext } from 'react'
import "./HomePage.css"
import { Datacontext } from '../Proivder/Dataprovider';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {

   const{tasks,setTasks}=useContext(Datacontext);
  
    const[task, setTask]=useState("");
    const[description,setDescription]=useState("");
    const [priority, setPriority] = useState("Low");
    const [searchTerm, setSearchTerm] = useState("");
    const[filteredTask,setfilteredTask]=useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };
      const handleStatusFilter = (status) => {
        setStatusFilter(status);
      };
    const handlePriorityFilter = (priority) => {
        setPriorityFilter(priority);
      };
    useEffect(()=>{
        const filteredTasks = tasks.filter(
            (task) =>
              (task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&  (statusFilter === "all" ||
              (statusFilter === "active" && !task.completed) ||
              (statusFilter === "completed" && task.completed)) &&
            (priorityFilter === "all" || task.priority === priorityFilter)
          );
        setfilteredTask(filteredTasks===""?tasks:filteredTasks);
    },[searchTerm,statusFilter,priorityFilter,tasks])
      
    const total = tasks.length;
  const left = tasks.filter((item) => !item.completed);
  const s=left.length;
    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();

        setTasks([{id:Date.now(),task,description,completed:false,priority},...tasks]);
        setDescription("");
        setTask("");
     
  
    }
        

    function toggletask(taskID)
    {

    setTasks(tasks.map((item)=>(
item.id===taskID?{...item,completed:!item.completed}:item
       )))
    }
console.log(tasks);
    return(
        <>
        {/* Heading of the page */}

        <h1>TODO APP!</h1>
        <p>Total Tasks: {total}</p>
        <p>Tasks Remaining: {s}</p>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Task">
                        <input className="input"
                                placeholder="Enter the task  here.."
                                value={task}
                                onChange={(e)=>setTask(e.target.value)}/>

                               
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Description">
                        <textarea className="input content"
                                placeholder="Description of the goes here.."
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}/>
                </Row >
                <Row label="Priority">
               
               
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low" style={{backgroundColor:'red'}}>Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
 </Row>

                {/* Button to submit the form */}            
                <button className = "btn">ADD</button>
            </form>

                     
        </div>

        <hr/>  

        
        <div id="search" className='mid' >

<input type="text" placeholder="🔍Search the Task" value={searchTerm}
        onChange={handleSearchChange} />
</div>
<div>
        <label>Status:</label>
        <button onClick={() => handleStatusFilter("all")}>All</button>
        <button onClick={() => handleStatusFilter("active")}>Active</button>
        <button onClick={() => handleStatusFilter("completed")}>Completed</button>
        <label>Priority:</label>
        <button onClick={() => handlePriorityFilter("all")}>All</button>
        <button onClick={() => handlePriorityFilter("Low")}>Low</button>
        <button onClick={() => handlePriorityFilter("Medium")}>Medium</button>
        <button onClick={() => handlePriorityFilter("High")}>High</button>
      </div>

        {
        
        
    filteredTask.map((item,index)=>{
    return(
        <div className='blog' key={index}>
<input type="checkbox" onChange={(e)=>toggletask(item.id)} checked={item.completed}/>
<h3>{item.task}</h3>
<p>{item.description}</p>
<p>{item.priority}</p>
<button><Link to={`/edit/${item.id}`}>Edit</Link></button>

</div>

  )})}
        </>
        )
    }

// Row component to introduce a new row section in the form
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
