import { useState } from "react";
import AddProject from "../components/AddProject";
import { useFetch } from "../context/useFetch";
export default function Dashboard() {
   const  { data, loading, error, refetch } = useFetch('https://task-management-backend-two-coral.vercel.app/v1/projects')
   const [filter, setFilter] = useState("All")
   const [searchQuery, setSearchQuery] = useState("")
   const [showModel, setShowModel] = useState(false) 
   const [currentPage, setCurrentPage] = useState(1)


   const handleFilter = (status) => {
    setFilter(status)
   }

   const filteredProjects = data?.filter(project => {
    const matchedFilter = filter === "All" || project.projectstatus === filter;
    const matchedSearch = project.projectname.toLowerCase().includes(searchQuery.toLowerCase())
    return matchedFilter && matchedSearch
   })


   const projectsPerPage = 12

   const totalProjects = Math.ceil(filteredProjects.length / projectsPerPage)
   const startIndex = (currentPage - 1) * projectsPerPage
   const displayedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage)

   const handlePageClick = (page) => {
    if (page >= 1 && page <= totalProjects) {
      setCurrentPage(page);
    }
  };

    
    return (
        <div className="px-3">
            {/* Search Bar */}
            <div className="input-group mb-4">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                />
            </div>

            {/* Top Bar: Projects + Filter on Left, Add Project + Pagination on Right */}
            <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                {/* Left side: Heading + Filter */}
                <div className="d-flex align-items-center flex-wrap">
                    <h2 className="fw-bold text-white me-3 mb-2 mb-md-0">Projects</h2>
                    <div className="dropdown">
                        <button
                            className="btn btn-light border dropdown-toggle d-flex align-items-center justify-content-around mt-2"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span className="me-2">Filter</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" type="button" onClick={() => handleFilter("All")}>All</button></li>
                            <li><button className="dropdown-item" type="button" onClick={() => handleFilter("To Do")}>To Do</button></li>
                            <li><button className="dropdown-item" type="button" onClick={() => handleFilter("In Progress")}>In Progress</button></li>
                            <li><button className="dropdown-item" type="button" onClick={() => handleFilter("Completed")}>Completed</button></li>
                        </ul>
                    </div>
                </div>

                {/* Right side: Add Project + Pagination */}
                <div className="d-flex align-items-center flex-wrap gap-2 mt-3 mt-md-0">
                    <button className="btn btn-primary fw-bold" onClick={() => setShowModel(true)}>+ Add Project</button>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination mb-0">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}><button className="page-link text-light" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>Previous</button></li>
                            <li className={`page-item ${currentPage === totalProjects ? "disabled" : ""}`}><button className="page-link text-light" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalProjects}>Next</button></li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Project Cards */}
            <div className="row">
                {searchQuery && filteredProjects?.length === 0 && (<p className="text-danger fw-bold fs-1 text-center">No Projects Found!</p>)}
                
                {loading && (<div className="d-flex justify-content-center"><div className="spinner-grow text-primary" role="status"></div></div>)}

                    {!loading && error && !data?.length && (<p className="text-danger fw-bold fs-1 text-center">Failed to fetch projects!</p>)}

                    {!loading && data?.length > 0 && displayedProjects?.map((project) => (
                    <div className="col-md-3 mb-4" key={project._id}>
                        <div className="project-card card h-100">
                        <div className="card-body">
                            <span className={`pe-3 mb-2 badge ${
                            project.projectstatus === "To Do"
                                ? "badge-todo"
                                : project.projectstatus === "In Progress"
                                ? "badge-inprogress"
                                : "badge-completed"
                            }`}>
                            {project.projectstatus}
                            </span>
                            <h5 className="card-title text-light">{project.projectname}</h5>
                            <p className="card-text text-light">{project.description}</p>
                        </div>
                        </div>
                    </div>
                    ))}

                {filteredProjects?.length > 0 && (<p className="text-light fw-bold fs-5 mt-3 position-fixed bottom-0">{`Page ${currentPage} — Showing ${displayedProjects.length} of ${filteredProjects.length} projects.`}</p>)}
</div>

            {showModel && <AddProject onAddProject={refetch} onClose={() => setShowModel(false)}/>}
        </div>
    );
}
