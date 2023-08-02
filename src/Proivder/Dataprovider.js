

import React, { createContext, useEffect,useState} from 'react'

const Datacontext=createContext();



const DataProvider=({children})=>{

    const [tasks, setTasks]=useState([]);

    
   
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);
      
    useEffect(()=>{
        const Gettasks=localStorage.getItem("tasks");
        if(Gettasks)
        {
            setTasks(JSON.parse(Gettasks));
        }
            },[])

const Edittasks=(id,newtask)=>{
    setTasks((item)=>(
        item.map((task)=>(
task.id===id?{...task,...newtask}:task
        ))
    ))

        }

     return (
     <Datacontext.Provider value={{ tasks, setTasks,Edittasks }}>
                  {children}
    </Datacontext.Provider>
              );
}

export{DataProvider,Datacontext};
