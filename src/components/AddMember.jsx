import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";

export default function AddMember({teamId, onClose, onAddMember }) {
//   const { teamid } = useParams();
  const { addUser } = useTaskContext();

 const [input, setInput] = useState({
  username: "",
  useremail: "",
  team: teamId
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
      await addUser(input);
      setShowSuccess(true);
      await onAddMember(); 
      setInput({
        username: "",
        useremail: "",
        team: teamId
      });
    } catch (error) {
      console.error("Error adding user:", error);
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
              <p className="modal-title fw-bold">Add New Member</p>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Name */}
                <label className="mb-1">Full Name</label>
                <input
                  required
                  name="username"
                  value={input.username}
                  onChange={inputHandler}
                  type="text"
                  className="form-control mb-3"
                  placeholder="Enter full name"
                />

                {/* Email */}
                <label className="mb-1">Email</label>
                <input
                  required
                  name="useremail"
                  value={input.useremail}
                  onChange={inputHandler}
                  type="email"
                  className="form-control mb-3"
                  placeholder="Enter email"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={btnLoading}>
                  {btnLoading ? "Adding..." : "Add Member"}
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
              <h5 className="text-success mb-3">✅ Member Added Successfully!</h5>
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
