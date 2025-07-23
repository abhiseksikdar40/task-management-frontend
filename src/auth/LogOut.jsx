import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const [userInitials, setUserInitials] = useState("");
  const [fullName, setFullName] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("Login-token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://task-management-backend-two-coral.vercel.app/v1/signup/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data?.fullname) {
          const nameParts = data.fullname.trim().split(" ");
          const first = nameParts[0];
          const last = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
          const initials = `${first[0] || ""}${last[0] || ""}`.toUpperCase();
          setUserInitials(initials);
          setFullName(data.fullname);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  return (
    <div
      className="position-relative text-white mt-auto"
      style={{ cursor: "pointer" }}
    >
      {showLogout && (
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-danger position-absolute"
          style={{
            top: "-35px",
            right: "0",
            zIndex: 10,
          }}
        >
          Logout
        </button>
      )}

      <div onClick={toggleLogout} className="d-flex align-items-center">
        <div
          className="d-flex align-items-center justify-content-center me-2"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {userInitials}
        </div>
        <div
          className="fw-medium"
          style={{
            fontSize: "14px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span className="text-light">{fullName}</span>
        </div>
      </div>
    </div>
  );
}
