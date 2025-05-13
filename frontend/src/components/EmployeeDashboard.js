import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./style.css";
import {
  FaBars, FaSignOutAlt, FaClipboardList, FaFileUpload, FaChartBar, FaEye
} from "react-icons/fa";
const barData = [
  { date: "2025-05-01", works: 2 },
  { date: "2025-05-02", works: 1 },
  { date: "2025-05-03", works: 0 },
  { date: "2025-05-04", works: 1 },
];

const pieData = [
  { name: "Completed", value: 4 },
  { name: "Pending", value: 1 },
];

const COLORS = ["#4caf50", "#f44336"];
const sampleAssignments = [
  { id: 101, date: "2025-05-01", location: "Delhi", hours: 2, completed: false },
  { id: 102, date: "2025-05-02", location: "Mumbai", hours: 4, completed: false },
  { id: 103, date: "2025-05-03", location: "Bangalore", hours: 3, completed: false },
  { id: 104, date: "2025-05-04", location: "Chennai", hours: 1, completed: false },
  { id: 105, date: "2025-05-05", location: "Delhi", hours: 5, completed: false },
  { id: 106, date: "2025-05-06", location: "Kolkata", hours: 2, completed: false },
  { id: 107, date: "2025-05-07", location: "Hyderabad", hours: 4, completed: false },
  { id: 108, date: "2025-05-08", location: "Pune", hours: 2, completed: false },
  { id: 109, date: "2025-05-09", location: "Delhi", hours: 3, completed: false },
  { id: 110, date: "2025-05-10", location: "Mumbai", hours: 1, completed: false },
  { id: 111, date: "2025-05-11", location: "Chandigarh", hours: 2, completed: false },
  { id: 112, date: "2025-05-12", location: "Ahmedabad", hours: 4, completed: false },
  { id: 113, date: "2025-05-13", location: "Jaipur", hours: 3, completed: false },
  { id: 114, date: "2025-05-14", location: "Indore", hours: 2, completed: false },
  { id: 115, date: "2025-05-15", location: "Lucknow", hours: 5, completed: false },
];



function EmployeeDashboard() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [assignments, setAssignments] = useState(sampleAssignments);
const [filters, setFilters] = useState({ date: "", location: "", hours: "" });
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 8;

    
  const [activeSection, setActiveSection] = useState("analytics");
 const [reports, setReports] = useState(() => {
  const stored = localStorage.getItem("uploadedReports");
  return stored ? JSON.parse(stored) : [];
});

  const [file, setFile] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(stored);
  }, []);

const handleReportUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const newReport = {
      id: Date.now(),
      name: file.name,
      data: reader.result,
      uploadedAt: new Date().toLocaleString(),
    };

    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem("uploadedReports", JSON.stringify(updatedReports));
  };
  reader.readAsDataURL(file);
};
const handleDeleteReport = (id) => {
  const updatedReports = reports.filter(r => r.id !== id);
  setReports(updatedReports);
  localStorage.setItem("uploadedReports", JSON.stringify(updatedReports));
};


  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out");
    window.location.reload();
  };
const filteredAssignments = assignments.filter(a => {
  return (
    (!filters.date || a.date === filters.date) &&
    (!filters.location || a.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.hours || a.hours === parseInt(filters.hours))
  );
});
const markCompleted = (id) => {
  setAssignments((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, completed: true } : item
    )
  );
};

const sortedAssignments = [...filteredAssignments].sort((a, b) =>
  a.completed === b.completed ? 0 : a.completed ? 1 : -1
);

const paginatedAssignments = sortedAssignments.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);

  return (
    <div className="smm-dashboard">
     <div className={`smm-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="smm-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>
        <div className="smm-menu">
          <div className={`smm-menu-item ${activeSection === "analytics" ? "active" : ""}`} onClick={() => setActiveSection("analytics")}>
            <FaChartBar />
            {isSidebarOpen && <span> Analytics</span>}
          </div>
          <div className={`smm-menu-item ${activeSection === "assignments" ? "active" : ""}`} onClick={() => setActiveSection("assignments")}>
            <FaClipboardList />
            {isSidebarOpen && <span>Assigned Bookings</span>}
            
          </div>
        
         
<div className={`smm-menu-item ${activeSection === "reports" ? "active" : ""}`} onClick={() => setActiveSection("reports")}>
  <FaFileUpload />
    {isSidebarOpen && <span>Upload Reports</span>}
</div>
 

          <div className="smm-menu-item logout">
            <FaSignOutAlt />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </div>
      </div>

        {activeSection === "analytics" && (
            <div className="smm-main">
          <section>
            <h2>Analytics</h2>
            <div className="charts">
              <div className="chart-box">
                <h3>Work Over Time</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="works" fill="#2196f3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-box">
                <h3>Work Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
          </div>
        )}

        {activeSection === "assignments" && (
             <div className="smm-main">
<section>
  <h2>Assigned Bookings</h2>

  <div className="filters">
    <input type="date" onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
    <input
      type="text"
      placeholder="Location"
      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
    />
    <input
      type="number"
      placeholder="Hours"
      onChange={(e) => setFilters({ ...filters, hours: e.target.value })}
    />
  </div>

  <table className="assignment-table">
    <thead>
      <tr>
        <th>Booking ID</th>
        <th>Date of Service</th>
        <th>Location</th>
        <th>Hours</th>
        <th>Action</th>
      </tr>
    </thead>
<tbody>
  {paginatedAssignments.length === 0 ? (
    <tr>
      <td colSpan="5" style={{ textAlign: "center", color: "#888", padding: "20px" }}>
        No assignments found for the selected filters.
      </td>
    </tr>
  ) : (
    paginatedAssignments.map((booking) => (
      <tr key={booking.id} className={booking.completed ? "completed" : ""}>
        <td>{booking.id}</td>
        <td>{booking.date}</td>
        <td>{booking.location}</td>
        <td>{booking.hours}</td>
        <td>
          {!booking.completed ? (
            <input type="checkbox" onChange={() => markCompleted(booking.id)} />
          ) : (
            <span>✔ Done</span>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>

  </table>

  <div className="pagination">
    {Array.from({ length: Math.ceil(sortedAssignments.length / pageSize) }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setCurrentPage(i + 1)}
        className={currentPage === i + 1 ? "active" : ""}
      >
        {i + 1}
      </button>
    ))}
  </div>
</section>

          </div>
        )}

        {activeSection === "reports" && (
             <div className="smm-main">
          <section>
  <h2>Upload Reports</h2>
  <input
  type="file"
  id="reportUpload"
  onChange={handleReportUpload}
  style={{ display: "none" }}
/>
<button onClick={() => document.getElementById("reportUpload").click()} className="btn-upload">
  Upload Report
</button>

  {reports.length === 0 ? (
    <p style={{ color: "#888", marginTop: "10px" }}>No reports uploaded yet.</p>
  ) : (
    <table className="report-table">
      <thead>
        <tr>
          <th>Report Name</th>
          <th>Uploaded At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.id}>
            <td>{report.name}</td>
            <td>{report.uploadedAt}</td>
            <td>
              <a href={report.data} download={report.name} className="btn-download">Download</a>
              <button onClick={() => handleDeleteReport(report.id)} className="btn-delete">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</section>

          </div>
        )}
      
    </div>
 
  );
}

export default EmployeeDashboard;
