import { useTaskContext } from "../context/TaskContext"
import { useState } from "react";

export default function AddTeam({onClose, onAddTeam}) {
    const {addTeam} = useTaskContext()
    const [createTeam, setCreateTeam] = useState({
        teamname: ""
    })

     const [btnLoading, setBtnLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const inputHandler = (e) => {
        const { name, value} = e.target

        setCreateTeam((preV) => ({
            ...preV, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setBtnLoading(true);
        
         const result = await addTeam(createTeam);

        if (result) {
            setShowSuccess(true);
            await onAddTeam();
            setInput({ teamname: "" });
        }

        setBtnLoading(false);
    }


    return (
       <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div className="modal fade show d-flex align-items-center justify-content-center" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fw-bold">Create New Team</p>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Team Name */}
                <label className="mb-1">Team Name</label>
                <input
                  required
                  name="teamname"
                  value={createTeam.teamname}
                  onChange={inputHandler}
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter Team Name"
                />
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
              <h5 className="text-success mb-3">✅ Team Created Successfully!</h5>
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
    )
}