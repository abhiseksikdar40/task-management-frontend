import { useState, useEffect } from "react";

export default function ProjectStatus({ project, onClose, onStatusChange, refetch }) {
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (project) {
      setNewStatus(project.projectstatus);
    }
  }, [project]);

  const handleSubmit = async () => {
    await onStatusChange(project._id, { projectstatus: newStatus });
    await refetch();
    onClose();
  };

  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <p className="modal-title fw-bold">Update Project Status</p>
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
