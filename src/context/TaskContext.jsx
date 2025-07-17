import { useContext, createContext, useState, useEffect } from "react";

const TaskContext = createContext()

export const useTaskContext = () => useContext(TaskContext)

export const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData =  async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("Login-token");
            const response = await fetch(url, {
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}
            })
            if(!response.ok) throw new Error("Failed to fetch data!")
            const result = await response.json()
            setData(result || [])
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    } 

    useEffect(() => {
        fetchData()
    }, [url])

    return { data, loading, error, refetch: fetchData}
}

export function TaskProvider({ children }) {
    

    const addProject = async (newProject) => {
        try {
            const token = localStorage.getItem("Login-token");
            const response = await fetch('https://task-management-backend-one-rho.vercel.app/v1/create/project', {
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



    const values = {
        addProject
    }

    return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>
}

