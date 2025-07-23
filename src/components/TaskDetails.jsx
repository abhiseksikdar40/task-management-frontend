import { useState } from "react";
export default function TaskDetails({ task, onClose, onStatusChange, refetch }) {
  const [newStatus, setNewStatus] = useState(task.taskstatus);

  const handleSubmit = async () => {
    await onStatusChange(task._id, { taskstatus: newStatus });
    await refetch();
    onClose();
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
              <p className="modal-title fw-bold">Update Task Status</p>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <label className="mb-2">Select Status</label>
              <select
                className="form-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
                </select>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn btn-success" onClick={handleSubmit}>Update</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
