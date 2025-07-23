import { Link, useLocation } from "react-router-dom";
import LogOut from "../auth/LogOut";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <aside
      className="d-flex flex-column justify-content-between border-end bg-dark text-white"
      style={{
        width: "200px",
        height: "100vh",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      {/* Top Logo & Navigation */}
      <div>
        <h5 className="fw-bold fs-2 text-white mb-5">Worflo</h5>

        <ul className="nav flex-column w-100 gap-4">
          <li className="nav-item">
            <Link
              to="/auth/dashboard"
              className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/dashboard") ? "text-primary fw-bold" : "text-light"}`}
            >
              <img className="nav-img" src="/dashboard.svg" alt="Dashboard" style={{ width: "16px" }} />
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/auth/tasks"
              className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/tasks") ? "text-primary fw-bold" : "text-light"}`}
            >
              <img className="nav-img" src="/tasks.svg" alt="Tasks" style={{ width: "16px" }} />
              Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/auth/team"
              className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/team") ? "text-primary fw-bold" : "text-light"}`}
            >
              <img className="nav-img" src="/team.svg" alt="Team" style={{ width: "16px" }} />
              Team
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/auth/reports"
              className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/reports") ? "text-primary fw-bold" : "text-light"}`}
            >
              <img className="nav-img" src="/report.svg" alt="Reports" style={{ width: "16px" }} />
              Reports
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom User Info */}
      <LogOut />
    </aside>
  );
}
