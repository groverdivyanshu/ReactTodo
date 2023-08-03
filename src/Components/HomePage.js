import React, { useContext } from 'react'
import "./HomePage.css"
import { Datacontext } from '../Proivder/Dataprovider';
import Modal from './Modal';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {

   const{tasks,setTasks}=useContext(Datacontext);
  
   
    const [searchTerm, setSearchTerm] = useState("");
    const[filteredTask,setfilteredTask]=useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [sortBy, setSortBy] = useState(null);
    const[modal,setModal]=useState(false);

function handlemodel()
{
setModal(true);
}

const Modalcheck = () => {
    setModal(false);
  };
    const handleSortByPriority = () => {
        setSortBy("priority");
      };
    
      const handleSortByCompletionStatus = () => {
        setSortBy("completionStatus");
    };

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
        const sortedTasks = tasks.sort((a, b) => {
            if (sortBy === "priority") {
              const priorityOrder = { Low: 1, Medium: 2, High: 3 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else if (sortBy === "completionStatus") {
                return a.completed === b.completed ? 0 : a.completed?1:1;
            } else {
              // If no sorting option selected, keep tasks in the original order
              return 0;
        }
    });
        setfilteredTask(sortedTasks===""?tasks:sortedTasks);
    },[sortBy])
    
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
            

                               
        
                {/* Button to open modal*/}            
                <button className = "btn" onClick={handlemodel}>ADD</button>
                <Modal open={modal} Close={Modalcheck} />
    

                     
        </div>

        <hr/>  

        
        <div id="search" className='mid' >
     <h3>Search By Task and Description</h3>
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
<div>
<button onClick={handleSortByPriority}>Sort Priority</button>
        <button onClick={handleSortByCompletionStatus}>Sort Completion</button>
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

