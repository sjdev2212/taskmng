import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'




const Task = ({language, userId}) => {
    const [tasks, setTasks] = useState([])
   

useEffect(  ()  => {
    async function fetchData() {
    const response = await axios.get(`https://todo-danielamoroso31.b4a.run/${userId}/tasks`)

    console.log(response.status)
    if (response.data.status === 201 ) {
        setTasks([])
        console.log(response)
    }
    else {

        setTasks(response.data.result)
       
        console.log(response.data.result)
    }
    }
    fetchData()

  
}, [userId])



  return (
    <div>
        <h2>
        {language === 'english' ? 'Add a task' : 'Agregar una tarea'}
        </h2>
        <div>
{!tasks ? <p>{language === 'english' ? 'No tasks yet' : 'No hay tareas'}</p> : tasks.map((task) => {   
    return (
        <div key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
        </div>
    )
        
})
}
 


        </div>

    </div>
  )
}

export default Task