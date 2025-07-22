import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { useFetch } from "../context/useFetch";

export default function AddTask({ onClose, onAddTask }) {
const { data: projectData } = useFetch('https://task-management-backend-two-coral.vercel.app/v1/projects');
const { data: teamData } = useFetch('https://task-management-backend-two-coral.vercel.app/v1/teams');
  const { addTask } = useTaskContext();

  const [input, setInput] = useState({
    taskname: "",
    project: "",
    team: "",
    taskstatus: "",
    duedate: "",
    priority: ""
  });

  const [btnLoading, setBtnLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      // send task to context
      await addTask(input);
      setShowSuccess(true);
      await onAddTask();
      setInput({
        taskname: "",
        project: "",
        team: "",
        taskstatus: "",
        duedate: "",
        priority: ""
      });
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fw-bold">Create New Task</p>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Task Name */}
                <label className="mb-1">Task Name</label>
                <input
                  required
                  name="taskname"
                  value={input.taskname}
                  onChange={inputHandler}
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter Task Name"
                />

                {/* Select Project */}
                <label className="mb-1">Select Project</label>
               <select
                  name="project"
                  className="form-select mb-3"
                  onChange={inputHandler}
                  value={input.project}
                  required
                >
                  <option value="">-- Choose Project --</option>
                  {projectData?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectname}
                    </option>
                  ))}
                </select>

                {/* Select Team */}
                <label className="mb-1">Select Team</label>
                <select
                  name="team"
                  className="form-select mb-3"
                  onChange={inputHandler}
                  value={input.team}
                  required
                >
                  <option value="">-- Choose Team --</option>
                  {teamData?.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.teamname}
                    </option>
                  ))}
                </select>

                <label className="mb-1">Select Due Date</label><br />
                <input type="date" name="duedate" className="form-control mb-3" onChange={inputHandler}
                  value={input.duedate} />

                  <label className="mb-1">Task Status</label>
                  <select
                    name="taskstatus"
                    className="form-select mb-3"
                    onChange={inputHandler}
                    value={input.taskstatus}
                    required
                  >
                    <option value="">-- Select Status --</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <label className="mb-1">Set Priority</label>
                <select
                  name="priority"
                  className="form-select mb-3"
                  onChange={inputHandler}
                  value={input.priority}
                  required
                >
                  <option value="Low" selected>Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={btnLoading}>
                  {btnLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content p-4 text-center">
              <h5 className="text-success mb-3">✅ Task Created Successfully!</h5>
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowSuccess(false);
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
