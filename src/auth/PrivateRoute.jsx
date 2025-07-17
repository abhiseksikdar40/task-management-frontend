import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [isValidToken, setIsValidToken] = useState(null);
  const token = localStorage.getItem("Login-token");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("https://task-management-backend-one-rho.vercel.app/auth", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`},
        });

        if (response.ok) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsValidToken(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setIsValidToken(false);
    }
  }, [token]);

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    return <Navigate to="/login" />;
  }

  return children;
}
