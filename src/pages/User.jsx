import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useFetch } from "../context/useFetch";
import AddMember from "../components/AddMember";

export default function User() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModel, setShowModel] = useState(false);

  const { data: users = [], refetch } = useFetch("https://task-management-backend-two-coral.vercel.app/v1/users");

  // Ref to persist user colors
  const userColorMapRef = useRef({});

  // Generate pastel HSL
  const getRandomPastel = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 85%)`;
  };

  // Darken HSL
  const darkenHSL = (hsl, amount = 30) => {
    const [h, s, l] = hsl.match(/\d+/g).map(Number);
    return `hsl(${h}, ${s}%, ${Math.max(l - amount, 10)}%)`;
  };

  // Set persistent colors for users
useEffect(() => {
  const storedColors = JSON.parse(localStorage.getItem("user-colors") || "{}");
  let updated = false;

  users.forEach(user => {
    if (!user?._id) return;

    if (!storedColors[user._id]) {
      const pastel = getRandomPastel();
      storedColors[user._id] = {
        bg: pastel,
        text: darkenHSL(pastel)
      };
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem("user-colors", JSON.stringify(storedColors));
  }

  userColorMapRef.current = storedColors;
}, [users]);



  // Fetch team by ID
  useEffect(() => {
    const token = localStorage.getItem("Login-token");

    const fetchTeam = async () => {
      try {
        const res = await fetch(`https://task-management-backend-two-coral.vercel.app/v1/teams/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch team");
        }

        const result = await res.json();
        setTeam(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTeam();
  }, [id]);

  // Get initials
  const getInitials = (fullname = "") =>
    fullname
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();

  // Conditional renders
  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow text-primary" role="status"></div>
      </div>
    );
  if (error) return <p className="text-danger fw-bold fs-1 text-center">Error: {error}</p>;
  if (!team) return <p className="text-danger fw-bold fs-1 text-center">No team loaded</p>;

  return (
    <div>
      <Link to="/auth/team" className="back-team mb-3">
        <img src="/arrow-left.svg" alt="Left-Arrow" /> Back To Teams
      </Link>

      <div className="mt-5">
        <div className="d-flex justify-content-between">
          <h1>{team?.teamname || "No team loaded"}</h1>
          <div>
            <button className="btn btn-primary me-5" onClick={() => setShowModel(true)}>+ Member</button>
          </div>
          {showModel && <AddMember teamId={id} onAddMember={refetch} onClose={() => setShowModel(false)} />}
        </div>

        <p className="mt-3 text-light fw-semibold opacity-50">MEMBERS</p>
        <ul className="list-unstyled">
          {users
            .filter(user => user.team === id)
            .map(user => {
              const colors = userColorMapRef.current[user._id] || { bg: "#ccc", text: "#333" };
              const initials = getInitials(user.username);

              return (
                <li key={user._id} className="d-flex align-items-center gap-2 my-2 text-light">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: colors.bg,
                      color: colors.text,
                      fontWeight: "600",
                      fontSize: "1rem"
                    }}
                  >
                    {initials}
                  </div>
                    <h5 className="text-light mt-2">{user.username}</h5>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
