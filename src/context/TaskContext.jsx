import { useContext, createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TaskContext = createContext()

export const useTaskContext = () => useContext(TaskContext)

export function TaskProvider({ children }) {
    
     // Add Project
    const addProject = async (newProject) => {
        try {
            const token = localStorage.getItem("Login-token");
            const response = await fetch('https://task-management-backend-two-coral.vercel.app/v1/create/project', {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(newProject)
            })
            
            const result = await response.json()
            return result
        } catch (error) {
            console.log('Failed to add new project!', error)
            return { error: error.message };
        }
    }

    // Add Task
    const addTask = async (newTask) => {
        try {
            const token = localStorage.getItem("Login-token");
            const response = await fetch('https://task-management-backend-two-coral.vercel.app/v1/create/task', {
                method: "POST",
                headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(newTask)
            })

            const result = await response.json()
            return result
        } catch (error) {
            console.log('Failed to add new Task!', error)
            return { error: error.message };
        }
    }



     // Add Team
     const addTeam = async (newTeam) => {
        try {
            const token = localStorage.getItem("Login-token")
            const response = await fetch('https://task-management-backend-two-coral.vercel.app/v1/create/team', {
                method: "POST",
                headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(newTeam)
            })

            const result = await response.json()
            return result
        } catch (error) {
            console.log('Failed to add new Team!', error)
            return { error: error.message };
        }
     }



     const addUser = async (newUser) => {
         try {
            const token = localStorage.getItem("Login-token")
            const response = await fetch('https://task-management-backend-two-coral.vercel.app/v1/create/user', {
                method: "POST",
                headers: {"Content-Type" : "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(newUser)
            })

            const result = await response.json()
            return result
        } catch (error) {
            console.log('Failed to add new User!', error)
            return { error: error.message };
        }
     }



    const values = {
    addProject,
    addTask,
    addTeam,
    addUser,
}

    return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
}

