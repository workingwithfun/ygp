
import React, { useState, useEffect } from "react";
import "./style.css";
import {
  FaBars, FaSignOutAlt, FaUser, FaBriefcase, FaThumbsUp, FaClock, FaTasks, FaChartBar, FaEye
} from "react-icons/fa";
const professions = [
  "Photography", "Videography", "Photoediting", "Social Media Mananger",
  "Videoediting", "Graphic designing", "Admin", "Finance"
];
const services = ['Photography', 'Videography', 'Photoediting', 'Videoediting', 'Graphic Designing'];
const statuses = ['Pending', 'In Progress', 'Completed'];
const payments = ['Yes', 'No'];
const bookingsData = [
  { id: '#101', number:"9039495969", service: 'Photography', status: 'Service Booked', date: '2025-04-17' },
  { id: '#102',number:"9039495969", service: 'Videography', status: 'Quotation sent by YGP', date: '2025-04-12' },
  { id: '#103',number:"9039495969", service: 'Photoediting', status: 'Payment received', date: '2025-04-15' },
  { id: '#104',number:"9039495969", service: 'Videoediting', status: 'Delivered', date: '2025-04-14' },
  { id: '#105',number:"9039495969", service: 'Graphic Designing', status: 'Service Under Review', date: '2025-04-13' },
  { id: '#106',number:"9039495969", service: 'Photography', status: 'Payment request to customer', date: '2025-04-16' },
  { id: '#107',number:"9039495969", service: 'Videography', status: 'Quotation approved by customer', date: '2025-04-10' },
  { id: '#108',number:"9039495969", service: 'Photoediting', status: 'Under Fulfillment', date: '2025-04-14' },
  { id: '#109',number:"9039495969", service: 'Videoediting', status: 'Service Under Review', date: '2025-04-11' },
  { id: '#110',number:"9039495969", service: 'Photography', status: 'Payment received', date: '2025-04-09' },
  { id: '#111',number:"9039495969", service: 'Videography', status: 'Delivered', date: '2025-04-07' },
  { id: '#112',number:"9039495969", service: 'Photoediting', status: 'Service Booked', date: '2025-04-16' },
  { id: '#113',number:"9039495969", service: 'Videoediting', status: 'Quotation sent by YGP', date: '2025-04-18' },
  { id: '#114',number:"9039495969", service: 'Graphic Designing', status: 'Payment request to customer', date: '2025-04-13' },
  { id: '#115',number:"9039495969", service: 'Photography', status: 'Quotation approved by customer', date: '2025-04-08' },
  { id: '#116',number:"9039495969", service: 'Videography', status: 'Service Under Review', date: '2025-04-17' },
  { id: '#117',number:"9039495969", service: 'Photoediting', status: 'Payment received', date: '2025-04-06' },
  { id: '#118',number:"9039495969", service: 'Videoediting', status: 'Under Fulfillment', date: '2025-04-02' },
  { id: '#119',number:"9039495969", service: 'Graphic Designing', status: 'Delivered', date: '2025-04-05' },
  { id: '#120',number:"9039495969", service: 'Photography', status: 'Quotation sent by YGP', date: '2025-04-04' },
];

//feedback
const feedbackData = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Great service!", date: "2025-04-10" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Could be better.", date: "2025-04-12" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", message: "Very professional team.", date: "2025-04-14" },
];

const Admin= () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeSection, setActiveSection] = useState('employees');
const [reports, setReports] = useState(() => {
  const stored = localStorage.getItem("uploadedReports");
  return stored ? JSON.parse(stored) : [];
});
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
    {/*Manage Employee*/}
    const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    name: '', profession: '', phone: '', address: '', email: '', salary: ''
  });
  const employeesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEmployees = filter ? employees.filter(e => e.profession === filter) : employees;
  const totalPage= Math.ceil(filteredEmployees.length / employeesPerPage);
const indexOfLastEmp = currentPage * employeesPerPage;
const indexOfFirstEmp = indexOfLastEmp - employeesPerPage;
const currentEmployees = filteredEmployees.slice(indexOfFirstEmp, indexOfLastEmp);

  useEffect(() => {
    const stored = localStorage.getItem('employees');
    if (stored) setEmployees(JSON.parse(stored));
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('employees', JSON.stringify(data));
  };

  const handleAdd = () => {
    setCurrentEmployee({ name: '', profession: '', phone: '', address: '', email: '', salary: '' });
    setEditMode(true);
    setShowModal(true);
  };

  const handleEdit = (emp) => {
    setCurrentEmployee(emp);
    setEditMode(false);
    setShowModal(true);
  };

  const handleDelete = (phone) => {
    const updated = employees.filter(emp => emp.phone !== phone);
    setEmployees(updated);
    saveToLocalStorage(updated);
  };

  const handleSave = () => {
    const updated = [...employees, currentEmployee];
    setEmployees(updated);
    saveToLocalStorage(updated);
    setShowModal(false);
  };

  const handleUpdate = () => {
    const updated = employees.map(emp => emp.phone === currentEmployee.phone ? currentEmployee : emp);
    setEmployees(updated);
    saveToLocalStorage(updated);
    setEditMode(false);
  };

 

  {/*Manange client*/}
  const [clients, setClients] = useState([]);
  

  const clientsPerPage = 8;

  useEffect(() => {
    const stored = localStorage.getItem('clients');
    if (stored) {
      setClients(JSON.parse(stored));
    } else {
      setClients(bookingsData);
      localStorage.setItem('clients', JSON.stringify(bookingsData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const clienthandleDelete = (id) => {
    const updated = clients.filter(c => c.id !== id);
    setClients(updated);
  };

  const filtered = filter ? bookingsData.filter(c => c.service === filter) :  bookingsData;
  const totalPages = Math.ceil(filtered.length / clientsPerPage);
  const indexOfLast = currentPage * clientsPerPage;
  const indexOfFirst = indexOfLast - clientsPerPage;
  const currentClients = filtered.slice(indexOfFirst, indexOfLast);
//Manage feedback
const [feedbacks, setFeedbacks] = useState([]);
const [selectedFeedback, setSelectedFeedback] = useState(null);

useEffect(() => {
  const stored = localStorage.getItem('feedbacks');
  if (stored) {
    setFeedbacks(JSON.parse(stored));
  } else {
    setFeedbacks(feedbackData);
    localStorage.setItem('feedbacks', JSON.stringify(feedbackData));
  }
}, []);

useEffect(() => {
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}, [feedbacks]);

const handleDeleteFeedback = (id) => {
  const updated = feedbacks.filter(f => f.id !== id);
  setFeedbacks(updated);
};

return (
<div className="smm-dashboard">
     <div className={`smm-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="smm-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>
        <div className="smm-menu">
          <div className={`smm-menu-item ${activeSection === "employees" ? "active" : ""}`} onClick={() => setActiveSection("employees")}>
            <FaUser />
            {isSidebarOpen && <span>Manange Employees</span>}
          </div>
          <div className={`smm-menu-item ${activeSection === "clients" ? "active" : ""}`} onClick={() => setActiveSection("clients")}>
            <FaBriefcase />
            {isSidebarOpen && <span>Manange clients</span>}
          </div>
        
         
<div className={`smm-menu-item ${activeSection === "feedback" ? "active" : ""}`} onClick={() => setActiveSection("feedback")}>
  <FaThumbsUp />
  {isSidebarOpen && <span>Manage Feedback</span>}
</div>
 <div className={`smm-menu-item ${activeSection === "reports" ? "active" : ""}`} onClick={() => setActiveSection("reports")}>

            <FaTasks />
            {isSidebarOpen && <span>Reports</span>}
          </div>

          <div className="smm-menu-item logout">
            <FaSignOutAlt />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </div>
      </div>
            {/* Main Content */}
            {activeSection === "employees" && (
            <div className="smm-main">
               <div className="emp-manage">
      <h2>Manage Employees</h2>

      <div className="emp-controls">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="emp-select">
          <option value="">All Professions</option>
          {professions.map(prof => (
            <option key={prof} value={prof}>{prof}</option>
          ))}
        </select>
        <button onClick={handleAdd} className="emp-btn">Add Employee</button>
      </div>

      <table className="emp-table">
        <thead>
          <tr>
            <th>Name</th><th>Profession</th><th>Phone</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
       <tbody>
       {currentEmployees.map((emp, index) => (
       
            <tr key={emp.phone}>
              <td>{emp.name}</td>
              <td>{emp.profession}</td>
              <td>{emp.phone}</td>
              <td>{emp.email}</td>
              <td>
                <button onClick={() => handleEdit(emp)} className="emp-btn">Edit</button>
                <button onClick={() => handleDelete(emp.phone)} className="emp-btn">Delete</button>
              </td>
            </tr>
          ))}
      
        </tbody>
      </table>
      {totalPage > 1 && (
  <div className="pagination">
    {[...Array(totalPage)].map((_, i) => (
      <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
        {i + 1}
      </button>
    ))}
  </div>
)}

      {showModal && (
        <div className="emp-modal">
          <div className="emp-modal-content">
            <span onClick={() => setShowModal(false)} className="emp-close">&times;</span>
            <h3>Employee Details</h3>
            <form className="emp-form">
  {[
    { label: 'Name', key: 'name' },
    { label: 'Phone', key: 'phone' },
    { label: 'Address', key: 'address' },
    { label: 'Email', key: 'email' },
    { label: 'Profession', key: 'profession', isSelect: true },
    { label: 'Salary', key: 'salary' }
  ].map(({ label, key, isSelect }) => (
    <div className="emp-form-group" key={key}>
    <div className="emp-form-group" key={key}>
  {isSelect ? (
    <select
      disabled={!editMode}
      value={currentEmployee[key]}
      onChange={(e) => setCurrentEmployee({ ...currentEmployee, [key]: e.target.value })}
      className={currentEmployee[key] ? 'emp-filled' : ''}
      required
    >
      <option value="" disabled hidden />
      {professions.map(p => <option key={p} value={p}>{p}</option>)}
    </select>
  ) : (
    <input
      type="text"
      placeholder=" "
      disabled={!editMode}
      value={currentEmployee[key]}
      onChange={(e) => setCurrentEmployee({ ...currentEmployee, [key]: e.target.value })}
      className={currentEmployee[key] ? 'emp-filled' : ''}
      required
    />
  )}
  <label>{label}</label>
</div>

    </div>
  ))}
</form>


            <div className="emp-modal-actions">
              {!editMode ? (
                <button onClick={() => setEditMode(true)} className="emp-btn">Edit</button>
              ) : currentEmployee.phone && employees.some(e => e.phone === currentEmployee.phone) ? (
                <button onClick={handleUpdate} className="emp-btn">Update</button>
              ) : (
                <button onClick={handleSave} className="emp-btn">Save</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

      
      
              {/* Table */}
      
      
            </div>)}

            {activeSection === "clients" && (
            <div className="smm-main">
<div className="client-container">
      <h2>Manage Clients</h2>
      <div className="client-controls">
        <select value={filter} onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}>
          <option value="">Filter by Service</option>
          {services.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <table className="client-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Service</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.service}</td>
              <td>{c.status}</td>
              <td>{c.number}</td>
              <td>{c.date}</td>
              <td><button onClick={() => clienthandleDelete(c.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} className={currentPage === i + 1 ? 'active' : ''} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>

 
      
            </div>)}

                    {activeSection === "reports" && (
                         <div className="smm-main">
                      <section>
              <h2>Upload Reports</h2>
              
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
            {activeSection === "feedback" && (
  <div className="smm-main">
<div className="feedback-container">
  <h2>Manage Feedback</h2>
 <table className="feedback-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Message</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {feedbacks.length === 0 ? (
      <tr>
        <td colSpan="5">No feedback available</td>
      </tr>
    ) : (
      feedbacks.map(fb => (
        <tr key={fb.id}>
          <td>{fb.name}</td>
          <td>{fb.email}</td>
          <td>{fb.message.length > 30 ? fb.message.slice(0, 30) + "..." : fb.message}</td>
          <td>{fb.date}</td>
          <td>
            <button className="view-btn" onClick={() => setSelectedFeedback(fb)}>View</button>
            <button className="delete-btn" onClick={() => handleDeleteFeedback(fb.id)}>Delete</button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>


  {selectedFeedback && (
    <div className="modal-overlay">
      <div className="feedback-modal modern">
        <span className="close-btn" onClick={() => setSelectedFeedback(null)}>&times;</span>
        <h3>Feedback Details</h3>
        <p><strong>Name:</strong> {selectedFeedback.name}</p>
        <p><strong>Email:</strong> {selectedFeedback.email}</p>
        <p><strong>Date:</strong> {selectedFeedback.date}</p>
        <p><strong>Message:</strong> {selectedFeedback.message}</p>
      </div>
    </div>
  )}
</div>

  </div>
)}

</div>

);
};


export default Admin;
