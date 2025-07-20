import { useEffect, useState } from "react"

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