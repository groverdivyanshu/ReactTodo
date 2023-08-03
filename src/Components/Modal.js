import React, { useContext } from 'react'
import { useState } from 'react'
import { Datacontext } from '../Proivder/Dataprovider'
import "./Modal.css"

export default function Modal({open,Close}) {
 const {tasks, setTasks}=useContext(Datacontext);
 const[task, setTask]=useState("");
 const[description,setDescription]=useState("");
 const [priority, setPriority] = useState("Low");
 
 
 
 const handlePriority = (e) => {
  setPriority(e.target.value);
};
 const handleAddTask = () => {
    if (task.trim() === '') {
      return;
    }


    const newTask = {id:Date.now(),description,completed: false,task,priority,
     };

    setTasks([...tasks, newTask]);
    setTask("");
    setDescription("");
    Close();
  };



  return (
    <>
    
    <div className={`box ${open ? 'boxup' : ''}`}>
          <div className="boxshow">
              <h2>Add New Task</h2>
              <h3 style={{color:'black'}}>Task</h3>
              <Row label="Task">
                   
                  <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='PLease enter the Task' />
              </Row>
              <br />
              <h3 style={{color:'black'}}>Description</h3>
              <Row label="description">
              
                  <textarea value={description} onChange={(e) => setDescription(e.target.value) } placeholder='PLease enter the Deccrition'/>
            
              <br />
          </Row>
          <Row label=" Priority">
         
          <select value={priority} onChange={handlePriority}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
          </select>
          </Row>
      <br /><button onClick={handleAddTask}>Add Task</button><button onClick={Close}>Cancel</button>
     
    </div>
  </div>
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