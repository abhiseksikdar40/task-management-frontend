import { useState } from "react"
import AddTeam from "../components/AddTeam"
import { useFetch } from "../context/useFetch"
import { Link } from "react-router-dom"

export default function Team() {
    const { data, loading, error, refetch} = useFetch('https://task-management-backend-two-coral.vercel.app/v1/teams')
    const [showModel, setShowModel] = useState(false)

   return (
  <div className="container-fluid mt-4">
    <div className="d-flex justify-content-between">
      <h1>Teams</h1>
      <div>
        <button className="btn btn-primary me-5" onClick={() => setShowModel(true)}>+ Add Team</button>
      </div>
    </div>

    <div className="row mt-3">
        {loading && (<div className="d-flex justify-content-center"><div className="spinner-grow text-primary" role="status"></div></div>)}

        {!loading && error && !data?.length && (<p className="text-danger fw-bold fs-1 text-center">Failed to fetch Teams!</p>)}
      {data?.map(team => (
        <div className="col-md-3 mb-2" key={team._id}>
          <Link to={`/auth/teams/${team._id}`} className="text-decoration-none">
            <div className="card bg-dark">
              <div className="card-body">
                <h2 className="card-title text-light">{team.teamname}</h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>

    {showModel && <AddTeam onAddTeam={refetch} onClose={() => setShowModel(false)} />}
  </div>
);

}