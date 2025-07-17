import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

export default function AddProject({ onClose, onAddProject }) {
    const { addProject } = useTaskContext();

    const [input, setInput] = useState({
        projectname: "",
        description: ""
    });

    const [btnLoading, setBtnLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // input handler
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnLoading(true);

        const result = await addProject(input);

        if (result) {
            setShowSuccess(true);
            await onAddProject();
            setInput({ projectname: "", description: "" });
        }

        setBtnLoading(false);
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="modal-backdrop fade show"
            ></div>

            {/* Modal */}
            <div
                className="modal fade show d-flex align-items-center justify-content-center"
                tabIndex="-1"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title fw-bold">Create New Project</p>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label className="mb-1">Project Name</label>
                                <input
                                required
                                    name="projectname"
                                    value={input.projectname}
                                    onChange={inputHandler}
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Enter Project Name"
                                />

                                <label className="mb-1">Project Description</label>
                                <textarea
                                required
                                    name="description"
                                    value={input.description}
                                    onChange={inputHandler}
                                    className="form-control"
                                    placeholder="Enter Project Description"
                                    rows={3}
                                ></textarea>
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

            {/* ✅ Success message modal */}
            {showSuccess && (
                <div
                    className="modal fade show d-flex align-items-center justify-content-center"
                    tabIndex="-1"
                >
                    <div className="modal-dialog">
                        <div className="modal-content p-4 text-center">
                            <h5 className="text-success mb-3">✅ Project Created Successfully!</h5>
                            <button className="btn btn-success" onClick={() => {
                                setShowSuccess(false);
                                onClose();
                            }}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
