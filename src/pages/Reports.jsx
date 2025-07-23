import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useFetch } from "../context/useFetch";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function Reports() {
  const [timeRange, setTimeRange] = useState("24h");

  const { data: tasks = [], loading, error } = useFetch('https://task-management-backend-two-coral.vercel.app/v1/tasks');

  const [workDoneGrouped, setWorkDoneGrouped] = useState({});

  useEffect(() => {
    if (!Array.isArray(tasks)) return;

    const now = new Date();
    let cutoff;
    if (timeRange === "24h") cutoff = new Date(now - 24 * 60 * 60 * 1000);
    else if (timeRange === "7d") cutoff = new Date(now - 7 * 24 * 60 * 60 * 1000);
    else cutoff = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const filtered = tasks.filter(
      (task) =>
        task?.taskstatus === "Closed" && new Date(task?.updatedAt) >= cutoff
    );

    const grouped = {};
    filtered.forEach((task) => {
      const key = task?.project?.projectname || "Unassigned Project";
      grouped[key] = (grouped[key] || 0) + 1;
    });

    setWorkDoneGrouped(grouped);
  }, [timeRange, tasks]);

  const totalWorkDoneData = {
    labels: Object.keys(workDoneGrouped),
    datasets: [
      {
        label: "Tasks Closed",
        data: Object.values(workDoneGrouped),
        backgroundColor: [
          "#4BC0C0", "#FF6384", "#36A2EB", "#FFCE56", "#9966FF", "#FF9F40",
        ],
      },
    ],
  };

 const workPendingData = (() => {
  // Only include tasks that are not "Closed"
  const pendingTasks = tasks.filter(
    (task) => task?.taskstatus?.toLowerCase() !== "closed"
  );

  // Group pending tasks by their taskstatus
  const groupedByStatus = {};

  pendingTasks.forEach((task) => {
    const status = task?.taskstatus || "Unknown";
    groupedByStatus[status] = (groupedByStatus[status] || 0) + 1;
  });

  return {
    labels: Object.keys(groupedByStatus),
    datasets: [
      {
        label: "Tasks In Progress",
        data: Object.values(groupedByStatus),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };
})();


  const closedByTeamData = (() => {
    const closedTasks = tasks.filter((task) => task?.taskstatus === "Closed");
    const teamCounts = {};

    closedTasks.forEach((task) => {
      const teamName = task?.team?.teamname || "Unassigned";
      teamCounts[teamName] = (teamCounts[teamName] || 0) + 1;
    });

    return {
      labels: Object.keys(teamCounts),
      datasets: [
        {
          label: "Tasks Closed",
          data: Object.values(teamCounts),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    };
  })();

  if (loading) return <div>Loading reports...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="container-fluid">
      {/* Top Row: Work Done & Work Pending */}
      <div className="row">
        {/* Total Work Done */}
        <div className="col-md-6 mb-2">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">Total Work Done</h5>
                <select
                  className="form-select w-auto"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
              <div style={{ height: "300px" }}>
                <Pie
                  data={totalWorkDoneData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Work Pending */}
        <div className="col-md-6 mb-2">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Total Work Pending</h5>
              <div style={{ height: "300px" }}>
                <Bar
                  data={workPendingData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Tasks Closed by Team */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center mb-3">Tasks Closed by Team</h5>
              <div style={{ height: "220px" }}>
                <Bar
                  data={closedByTeamData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
