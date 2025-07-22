import { useEffect, useState } from "react";

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        if (!url || !url.startsWith("http")) return;

        try {
            setLoading(true);
            const token = localStorage.getItem("Login-token");
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Fetch failed: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            setData(result || []);
            setError(null); 
        } catch (error) {
            setError(error.message);
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
};
