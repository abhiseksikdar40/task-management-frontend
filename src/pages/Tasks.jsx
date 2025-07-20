import { useState } from "react";
import { useFetch } from "../context/useFetch";
import AddTask from "../components/AddTask";

export default function Tasks() {
    const { data, loading, error, refetch } = useFetch('https://task-management-backend-one-rho.vercel.app/v1/projects');
    const [showDetails, setShowDetails] = useState("All");
    const [showModel, setShowModel] = useState(false)

    const handleOption = (e) => {
        setShowDetails(e.target.value);
    };

    const selectedProject = data.find(project => project.projectname === showDetails);

    return (
        <div>
            <select className="form-select" onChange={handleOption}>
                <option value="All">Choose Project</option>
                {data?.map(project => (
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
                    {showModel && <AddTask onAddTask={refetch} onClose={() => setShowModel(false)}/>}
                </div>

                <table className="table table-bordered">
                    <thead>
                    <tr >
                        <th className="bg-transparent text-light text-center">TASKS</th>
                        <th className="bg-transparent text-light text-center">OWNER</th>
                        <th className="bg-transparent text-light text-center">PRIORITY</th>
                        <th className="bg-transparent text-light text-center">DUE DATE</th>
                        <th className="bg-transparent text-light text-center">STATUS</th>
                    </tr>
                    </thead>
                    <tbody>
                        {showDetails !== "All" && selectedProject && (
                            <>
                            
                            </>
                        )}
                    </tbody>
                </table>
                </>
            )}
        </div>
    );
}
