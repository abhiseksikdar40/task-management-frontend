import { useState } from "react";
import { useFetch } from "../context/useFetch";
import AddTask from "../components/AddTask";
import { Link } from "react-router-dom";

export default function Tasks() {
  const { data: projectData, refetch } = useFetch('https://task-management-backend-two-coral.vercel.app/v1/projects');
  const { data: taskData} = useFetch('https://task-management-backend-two-coral.vercel.app/v1/tasks');
  const [showDetails, setShowDetails] = useState("All");
  const [showModel, setShowModel] = useState(false);

  const handleOption = (e) => {
    setShowDetails(e.target.value);
  };

  const selectedProject = projectData.find(project => project.projectname === showDetails);

  return (
    <div>
      <select className="form-select" onChange={handleOption}>
        <option value="All">Choose Project</option>
        {projectData?.map(project => (
          <option key={project._id} value={project.projectname}>
            {project.projectname}
          </option>
        ))}
      </select>

      {showDetails !== "All" && selectedProject && (
        <>
          <div className="mt-5 d-flex justify-content-between">
            <div>
              <h1 className="text-light">{selectedProject.projectname}</h1>
              <p className="text-light">{selectedProject.description}</p>
            </div>
            <div>
              <button className="btn btn-primary me-5" onClick={() => setShowModel(true)}>+ Add Task</button>
            </div>
            {showModel && (
              <AddTask
                onAddTask={refetch}
                onClose={() => setShowModel(false)}
                projectId={selectedProject._id}
              />
            )}
          </div>

          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th className="bg-transparent text-light text-center">TASKS</th>
                <th className="bg-transparent text-light text-center">TEAM</th>
                <th className="bg-transparent text-light text-center">PRIORITY</th>
                <th className="bg-transparent text-light text-center">DUE DATE</th>
                <th className="bg-transparent text-light text-center">STATUS</th>
                <th className="bg-transparent text-light text-center" colSpan={2}>TASK INFO</th>
              </tr>
            </thead>
            <tbody>
              {taskData?.length > 0 ? (
                taskData.map(task => (
                  <tr key={task._id}>
                    <td className="bg-transparent text-light text-center align-middle">{task.taskname}</td>
                    <td className="bg-transparent text-light text-center align-middle">{task.team.teamname}</td>
                    <td className="bg-transparent text-light text-center align-middle">
                        <span
                            className={`badge px-2 py-2 ${
                            task.priority === "High"
                                ? "bg-danger"
                                : task.priority === "Medium"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                            style={{ fontSize: "0.9rem" }}
                        >
                            <i
                            className={`bi ${
                                task.priority === "High"
                                ? "bi-flag-fill"
                                : task.priority === "Medium"
                                ? "bi-flag-fill"
                                : "bi-flag"
                            } me-1`}
                            ></i>
                            {task.priority}
                        </span>
                        </td>
                    <td className="bg-transparent text-light text-center align-middle">{new Date(task.duedate).toLocaleDateString('en-IN', {day: "2-digit", month: "short", year: "numeric"})}</td>
                    <td className="bg-transparent text-light text-center align-middle">
                        <span className={`px-3 py-2 mb-2 mt-2 badge ${
                        task.taskstatus === "To Do"
                            ? "bg-primary"
                            : task.taskstatus === "In Progress"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}>
                        {task.taskstatus}
                        </span>
                    </td>
                    <td className="bg-transparent text-light text-center align-middle" colSpan={2}><Link><img src="/box-arrow-right.svg" className="mt-1" style={{width: "25px", filter: "invert(1)"}} alt="Details" /></Link></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="bg-transparent text-light text-center align-middle fw-bold" colSpan={6}>No tasks found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
