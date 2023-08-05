import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'



const Task = ({language, userId}) => {
    const [tasks, setTasks] = useState([])
   
const getUserTasks = async () => {
    const response = await axios.get(`https://todo-danielamoroso31.b4a.run/${userId}/tasks`)
    if (response.data.message === 'No tasks found') {
        setTasks([])
    }
    else {

        setTasks(response.data.result)
       
        console.log(response.data.result)
    }


}
useEffect(() => {
    getUserTasks()
}, [
    tasks

])


  return (
    <div>
        <h2>
        {language === 'english' ? 'Add a task' : 'Agregar una tarea'}
        </h2>
        <div>
{tasks === undefined ? <p>{language === 'english' ? 'No tasks yet' : 'No hay tareas'}</p> : tasks.map((task) => {   
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