import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <aside className="sidebar vh-100 px-4 py-3 d-flex flex-column align-items-center border-end" style={{ width: '200px' }}>
      <h5 className="fw-bold fs-2 text-white mb-5">Worflo</h5>

      <ul className="nav flex-column w-100 gap-4">
        <li className="nav-item">
          <Link
            to="/auth/dashboard"
            className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/dashboard") ? "text-primary fw-bold" : "text-light"}`}
          >
            <img className="nav-logo" src="/dashboard.svg" alt="Dashboard" style={{ width: '16px' }} />
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/auth/tasks"
            className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/tasks") ? "text-primary fw-bold" : "text-light"}`}
          >
            <img className="nav-logo" src="/tasks.svg" alt="Task" style={{ width: '16px' }} />
            Tasks
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/auth/team"
            className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/team") ? "text-primary fw-bold" : "text-light"}`}
          >
            <img className="nav-logo" src="/team.svg" alt="Team" style={{ width: '16px' }} />
            Team
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/auth/reports"
            className={`nav-link d-flex align-items-center p-0 gap-2 ${isActive("/auth/reports") ? "text-primary fw-bold" : "text-light"}`}
          >
            <img className="nav-logo" src="/report.svg" alt="Reports" style={{ width: '16px' }} />
            Reports
          </Link>
        </li>
      </ul>
    </aside>
  );
}
