import { useState } from "react";
import { useFetch } from "../context/useFetch";
import AddTask from "../components/AddTask";
import TaskDetails from "../components/TaskDetails";
import { useTaskContext } from "../context/TaskContext";

export default function Tasks() {
  const { data: projectData, refetch } = useFetch('https://task-management-backend-two-coral.vercel.app/v1/projects');
  const { data: taskData, refetch: refetchTask} = useFetch('https://task-management-backend-two-coral.vercel.app/v1/tasks');
  const { updateTaskStatus } = useTaskContext()
  const [showDetails, setShowDetails] = useState("All");
  const [showModel, setShowModel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);


  const handleOption = (e) => {
    setShowDetails(e.target.value);
  };

  const selectedProject = projectData.find(project => project.projectname === showDetails);
  const filteredTasks = taskData?.filter(task => task.project._id === selectedProject?._id);

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
              <div className="d-flex align-items-center">
                <h1 className="text-light me-4">{selectedProject.projectname}</h1>
                <span className={`pe-3 mb-2 mt-2 badge ${
                            selectedProject.projectstatus === "To Do"
                                ? "badge-todo"
                                : selectedProject.projectstatus === "In Progress"
                                ? "badge-inprogress"
                                : "badge-completed"
                            }`}>{selectedProject.projectstatus}</span>
              </div>
              <p className="text-light">{selectedProject.description}</p>
            </div>
            <div>
              <button className="btn btn-primary me-5" onClick={() => setShowModel(true)}>+ Add Task</button>
            </div>
            {showModel && (
              <AddTask
                onAddTask={refetchTask}
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
              </tr>
            </thead>
            <tbody>
              {filteredTasks?.length > 0 ? (
                filteredTasks.map(task => (
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
                        <span role="button" onClick={() => setSelectedTask(task)} className={`px-3 py-2 mb-2 mt-2 badge ${
                        task.taskstatus === "To Do"
                            ? "bg-primary"
                            : task.taskstatus === "In Progress"
                            ? "bg-warning text-dark"
                            : task.taskstatus === "Completed"
                            ? "bg-success"
                            : "bg-danger"
                        }`}>
                        {task.taskstatus}
                        </span>
                        {selectedTask && (
                            <TaskDetails
                              task={selectedTask}
                              onClose={() => setSelectedTask(null)}
                              onStatusChange={updateTaskStatus}
                              refetch={refetchTask}
                            />
                          )}
                    </td>
                  
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
