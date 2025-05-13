import React, { useState, useEffect } from "react";
import {
  FaBars, FaSignOutAlt, FaUser, FaBriefcase,FaFileUpload, FaClock, FaTasks, FaChartBar, FaEye
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";

import "./style.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {  BarChart, Bar,} from 'recharts';

import { Dialog } from '@headlessui/react';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const statuses = [
  "Service Booked",
  "Service Under Review",
  "Quotation sent by YGP",
  "Quotation approved by customer",
  "Payment request to customer",
  "Payment received",
  "Under Fulfillment",
  "Delivered",
];
const employeesList = [
  { id: 1, name: 'John Doe', service: 'Photography' },
  { id: 2, name: 'Jane Smith', service: 'Videography' },
  { id: 3, name: 'Alice Johnson', service: 'Photoediting' },
  { id: 4, name: 'Bob Brown', service: 'Videoediting' },
  { id: 5, name: 'Carol White', service: 'Photography' },
  { id: 6, name: 'David Lee', service: 'Videography' },
  { id: 7, name: 'Eva Green', service: 'Photoediting' },
  { id: 8, name: 'Frank Harris', service: 'Videoediting' },
  { id: 9, name: 'Grace Miller', service: 'Graphic Designing' },
  { id: 10, name: 'Henry Lewis', service: 'Videoediting' },
  { id: 11, name: 'Ivy Adams', service: 'Photoediting' },
  { id: 12, name: 'Jack Taylor', service: 'Graphic Designing' },
  { id: 13, name: 'Kelly Walker', service: 'Videography' },
  { id: 14, name: 'Liam Clark', service: 'Graphic Designing' },
  { id: 15, name: 'Mona Perez', service: 'Photography' },
  { id: 16, name: 'Nathan Scott', service: 'Videoediting' },
  { id: 17, name: 'Olivia Young', service: 'Photoediting' },
  { id: 18, name: 'Paul Turner', service: 'Videography' },
  { id: 19, name: 'Quincy Roberts', service: 'Videography' },
  { id: 20, name: 'Rachel Moore', service: 'Graphic Designing' }
];

const statusColors = {
  'Service Booked': '#8884d8',
  'Service Under Review': '#ffbb28',
  'Quotation sent by YGP': '#00C49F',
  'Quotation approved by customer': '#FF8042',
  'Payment request to customer': '#FF6666',
  'Payment received': '#82ca9d',
  'Under Fulfillment': '#888888',
  'Delivered': '#0088FE',
};

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
const ITEMS_PER_PAGE = 10;

const QuotationTemplate = React.forwardRef(({ details }, ref) => {
  if (!details) return null;

  return (
    <div ref={ref} className="quotation-template">
      <h2>Quotation</h2>
      <hr />
      <p><strong>Booking ID:</strong> {details.bookingId}</p>
      <p><strong>Date:</strong> {details.date}</p>
      <p><strong>Service:</strong> {details.service}</p>
      <p><strong>Start Time:</strong> {details.startTime}</p>
      <p><strong>End Time:</strong> {details.endTime}</p>
      <p><strong>Total Hours:</strong> {details.bookingHours}</p>
      <p><strong>Total Cost:</strong> ₹{details.totalCost}</p>
      <p><strong>Address:</strong> {details.address}</p>
      <p><strong>Phone:</strong> {details.phone}</p>
      <p><strong>Email:</strong> {details.email}</p>
    </div>
  );
});


const SMMDashboard = () => {
const [bookings, setBookings] = useState(bookingsData.map(b => ({ ...b, assignedTo: [] })));
  const [employeeFilters, setEmployeeFilters] = useState('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;
  const [quotationGenerated, setQuotationGenerated] = useState(false);
  const [quotationDetails, setQuotationDetails] = useState(null);
  const generateRandomStartDate = () => {
    const start = new Date(2025, 3, 1);
    const end = new Date(2025, 3, 20);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
      .toISOString()
      .split('T')[0];
  };
const [reports, setReports] = useState(() => {
  const stored = localStorage.getItem("uploadedReports");
  return stored ? JSON.parse(stored) : [];
});

  const initialData = [...Array(20).keys()].map((_, i) => ({
    id: `#${101 + i}`,
    number: ' 9039495969',
    service: ['Photography', 'Videography', 'Photoediting', 'Videoediting', 'Graphic Designing'][i % 5],
    status: [
      'Service Booked',
      'Quotation sent by YGP',
      'Payment received',
      'Delivered',
      'Service Under Review',
      'Payment request to customer',
      'Quotation approved by customer',
      'Under Fulfillment'
    ][i % 8],
    date: generateRandomStartDate(),
    assignedTo: [],
  }));
 const [data, setData] = useState(initialData);
 const [filterService, setFilterService] = useState('');


  const [editIndex, setEditIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeFilter, setEmployeeFilter] = useState('All');

  const pageSize = 8;
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
    const filteredData = data.filter((item) =>
    (!filterService || item.service === filterService) &&
    (!filterDate || item.date === filterDate)
  );

const handleOpenModal = (booking) => {
  setSelectedBooking(booking);
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
  setSelectedBooking(null);
};

{/*Tasks*/}
  
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

const [paginatData, setPaginatData] = useState([]);
  const toggleEmployeeAssignment = (name) => {
    const newData = [...data];
    const entry = newData[editIndex];
    const assigned = entry.assignedTo;
    if (assigned.includes(name)) {
      entry.assignedTo = assigned.filter((n) => n !== name);
    } else {
      entry.assignedTo = [...assigned, name];
    }
    setData(newData);
  };

  const deleteEntry = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('client');
  const [filterStatus, setFilterStatus] = useState('All');
 
  const handleStatusChange = (id, newStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };
  const filteredBookings = bookings
    .filter(b => filterStatus === 'All' || b.status === filterStatus)
    .filter(b => !filterDate || new Date(b.date).toDateString() === filterDate.toDateString())
    .sort((a, b) => new Date(b.date) - new Date(a.date));

    const statusCountData = statuses.map(status => {
      const count = filteredBookings.filter(b => b.status === status).length;
      return { name: status, value: count };
    });
    const printRef = useRef();

    const bookingsPerDate = {};
    filteredBookings.forEach(b => {
      bookingsPerDate[b.date] = (bookingsPerDate[b.date] || 0) + 1;
    });
    const lineChartData = Object.keys(bookingsPerDate).map(date => ({
      date,
      bookings: bookingsPerDate[date],
    }));
    


  // Calculate the index of the first and last item on the current page
  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;

  // Get the data for the current page
  const currentData = filteredBookings.slice(firstIndex, lastIndex);


  // Calculate the total number of pages
  const totalPages = Math.ceil(bookingsData.length / ITEMS_PER_PAGE);

  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const [formData, setFormData] = useState({});
  const [isReadonly, setIsReadonly] = useState(true);
  const [quotationViewed, setQuotationViewed] = useState(false);
  const [paymentRequested, setPaymentRequested] = useState(false);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    let updatedData = [...data];
  
    if (filterService) {
      updatedData = updatedData.filter(item => item.service === filterService);
    }
  
    if (filterDate) {
      updatedData = updatedData.filter(item => item.date === filterDate);
    }
  
    setFilterData(updatedData);
  }, [filterService, filterDate, data]);
  

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setFormData({
      bookingId: booking.id,
      date: '',
      startTime: '',
      endTime: '',
      totalCost: '',
      service: booking.service,
      people: 1,
      address: '',
      phone: '',
      email: '',
      instructions: '',
      rating: 0,
    });
    setIsReadonly(true);
    setQuotationGenerated(false);
    setQuotationViewed(false);
    setPaymentRequested(false);
    setShowModal(true);
  };

  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    if (field === 'startTime' || field === 'endTime') {
      const start = new Date(`2023-01-01T${updatedForm.startTime}`);
      const end = new Date(`2023-01-01T${updatedForm.endTime}`);
      const diffHours = (end - start) / (1000 * 60 * 60);
      if (diffHours > 0) {
        updatedForm.totalCost = diffHours * 1000;
      }
    }
    setFormData(updatedForm);
  };

  const handleSave = () => setIsReadonly(true);
  const handleEdit = () => setIsReadonly(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
const handleViewQuotation = () => {
  setShowQuotationModal(true);
};

  const handleRequestPayment = () => setPaymentRequested(true);
  const handleAssignTask = () => alert('Task assigned!');

  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => !isReadonly && handleChange('rating', i)}
          style={{
            cursor: isReadonly ? 'default' : 'pointer',
            color: formData.rating >= i ? '#ffc107' : '#ccc',
            fontSize: '20px',
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  
// Add this to your useState list:
const [startTime, setStartTime] = useState({ hour: '', minute: '', meridian: 'AM' });
const [endTime, setEndTime] = useState({ hour: '', minute: '', meridian: 'AM' });
const [bookingHours, setBookingHours] = useState(0);
const [totalCost, setTotalCost] = useState(0);

const costPerHour = 1000;

// Time conversion helper
const convertToMinutes = ({ hour, minute, meridian }) => {
  let h = parseInt(hour);
  const m = parseInt(minute);
  if (meridian === 'PM' && h !== 12) h += 12;
  if (meridian === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

// Calculate booking hours and cost
const calculateBookingDetails = () => {
  const start = convertToMinutes(startTime);
  const end = convertToMinutes(endTime);
  if (start >= 0 && end > start) {
    const diffMinutes = end - start;
    const hours = diffMinutes / 60;
    setBookingHours(hours);
    setTotalCost(hours * costPerHour);
  } else {
    setBookingHours(0);
    setTotalCost(0);
  }
};

// Whenever time changes
useEffect(() => {
  calculateBookingDetails();
}, [startTime, endTime]);

// Time Picker JSX
const renderTimePicker = (label, time, setTime) => (
  <div className="form-group time-picker">
    <label>{label}</label>
    <div style={{ display: 'flex', gap: '8px' }}>
      <select
        value={time.hour}
        onChange={(e) => setTime({ ...time, hour: e.target.value })}
      >
        <option value="">Hr</option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>

      <select
        value={time.minute}
        onChange={(e) => setTime({ ...time, minute: e.target.value })}
      >
        <option value="">Min</option>
        {['00', '15', '30', '45'].map((min) => (
          <option key={min} value={min}>{min}</option>
        ))}
      </select>

      <select
        value={time.meridian}
        onChange={(e) => setTime({ ...time, meridian: e.target.value })}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  </div>
);

const handleGenerateQuotation = () => {
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  const data = {
    bookingId: formData.bookingId || '',
    date: formData.date || '',
    service: formData.service || '',
    startTime: formattedStartTime,
    endTime: formattedEndTime,
    bookingHours: bookingHours || 0,
    totalCost: totalCost || 0,
    people: formData.people || 1,
    address: formData.address || '',
    phone: formData.phone || '',
    email: formData.email || '',
    instructions: formData.instructions || '',
  };

  setQuotationDetails(data);
  setQuotationGenerated(true);
  toast.success("Quotation generated successfully");
};

const formatTime = (time) => {
 if (!time || time.hour === '' || time.minute === '' || !time.meridian) return 'N/A';
  const hour = parseInt(time.hour);
  const minute = parseInt(time.minute);
const period = time.meridian.toUpperCase();

  if (isNaN(hour) || isNaN(minute)) return 'N/A';
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
};


const QuotationTemplate = React.forwardRef((props, ref) => {
  const data = quotationDetails;

  return (
    <div ref={ref} className="quotation-template">
      <h2>Service Quotation</h2>
      <p><strong>Booking ID:</strong> {data.bookingId}</p>
      <p><strong>Date of Service:</strong> {data.date}</p>
      <p><strong>Service:</strong> {data.service}</p>
      <p><strong>Start Time:</strong> {data.startTime}</p>
      <p><strong>End Time:</strong> {data.endTime}</p>
      <p><strong>Total Booking Hours:</strong> {data.bookingHours} hour(s)</p>
      <p><strong>Total Cost:</strong> ₹{data.totalCost}</p>
      <p><strong>People:</strong> {data.people}</p>
      <p><strong>Address:</strong> {data.address}</p>
      <p><strong>Phone:</strong> {data.phone}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Instructions:</strong> {data.instructions || 'N/A'}</p>
      <hr />
      <p>Thank you for choosing our service!</p>
    </div>
  );
});
const openModal = (booking = null) => {
  setSelectedBooking({ 
    ...booking, 
    assignedEmployeeIds: booking ? booking.assignedToIds || [] : [] 
  });
  setShowModal(true);
};
const closeModal = () => {
  setSelectedBooking(null);
  setShowModal(false);
};

const handleAssign = () => {
  setBookings(prev =>
    prev.map(b =>
      b.id === selectedBooking.id
        ? { ...b, assignedTo: employeesList.filter(emp => selectedBooking.assignedEmployeeIds.includes(emp.id)).map(e => e.name), assignedToIds: selectedBooking.assignedEmployeeIds }
        : b
    )
  );
  closeModal();
};

const toggleEmployee = (id) => {
  setSelectedBooking(prev => {
    const alreadySelected = prev.assignedEmployeeIds.includes(id);
    return {
      ...prev,
      assignedEmployeeIds: alreadySelected
        ? prev.assignedEmployeeIds.filter(empId => empId !== id)
        : [...prev.assignedEmployeeIds, id]
    };
  });
};

const handleDelete = (id) => {
  setBookings(prev => prev.filter(b => b.id !== id));
};

// FILTERING
const filterBookings = bookings.filter(b => {
  const serviceMatch = serviceFilter === 'All' || b.service === serviceFilter;
  const dateMatch = dateFilter === '' || b.date === dateFilter;
  return serviceMatch && dateMatch;
});

// PAGINATION LOGIC

const indexOfLastBooking = currentPage * bookingsPerPage;
const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
const currentBookings = filterBookings.slice(indexOfFirstBooking, indexOfLastBooking);

const totalPage = Math.ceil(filterBookings.length / bookingsPerPage);

// Pagination: Logic to display the current page and navigate

  const [activeTab, setActiveTab] = useState('clients');
  const [uploadedReports, setUploadedReports] = useState([]);
  const [filters, setFilters] = useState('15days');

  const COLORS = ['#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0'];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedReports(prev => [...prev, file.name]);
      alert(`Uploaded: ${file.name}`);
    }
  };

  // Filter bookings data based on date (simplified)
  const filData = bookingsData; // (You can implement date filtering later)

  // Clients graphs data
  const servicesCount = filData.reduce((acc, item) => {
    acc[item.service] = (acc[item.service] || 0) + 1;
    return acc;
  }, {});

  const statusCount = filData.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});
  

  const serviceData = Object.keys(servicesCount).map(service => ({
    name: service,
    value: servicesCount[service],
  }));

  const statusData = Object.keys(statusCount).map(status => ({
    name: status,
    value: statusCount[status],
  }));

  const [showCustomDate, setShowCustomDate] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const applyFilter = (type) => {
    setFilters(type);
    setShowCustomDate(false);
    const now = new Date();
    if (type === '15days') {
      filterDatas(new Date(now.setDate(now.getDate() - 15)), new Date());
    } else if (type === '30days') {
      filterDatas(new Date(now.setDate(now.getDate() - 30)), new Date());
    }
  };
  
  const applyCustomDateRange = (start, end) => {
    if (start && end) {
      filterDatas(start, end);
    }
  };
  
  const filterDatas = (start, end) => {
    // Filter your data (e.g., bookingsData) based on the start and end dates
    const filtered = bookingsData.filter(item => {
      const date = new Date(item.date);
      return date >= start && date <= end;
    });
    // Update your serviceData/statusCountData/etc here based on `filtered`
  };
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



  return (

    <div className="smm-dashboard">
      {/* Sidebar */}
      <div className={`smm-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="smm-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>
        <div className="smm-menu">
          <div className={`smm-menu-item ${activeSection === "client" ? "active" : ""}`} onClick={() => setActiveSection("client")}>
            <FaUser />
            {isSidebarOpen && <span>Client Management</span>}
          </div>
          <div className={`smm-menu-item ${activeSection === "project" ? "active" : ""}`} onClick={() => setActiveSection("project")}>
            <FaBriefcase />
            {isSidebarOpen && <span>Projects</span>}
          </div>
        
          <div className={`smm-menu-item ${activeSection === "task" ? "active" : ""}`} onClick={() => setActiveSection("task")}>

            <FaTasks />
            {isSidebarOpen && <span>Task Management</span>}
          </div>
                  
                   
          <div className={`smm-menu-item ${activeSection === "reports" ? "active" : ""}`} onClick={() => setActiveSection("reports")}>
            <FaFileUpload />
              {isSidebarOpen && <span>Upload Reports</span>}
          </div>
           
          
          <div className={`smm-menu-item ${activeSection === "analytics" ? "active" : ""}`} onClick={() => setActiveSection("analytics")}>
            <FaChartBar />
            {isSidebarOpen && <span>Analytics</span>}
          </div>
          <div className="smm-menu-item logout">
            <FaSignOutAlt />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeSection === "client" && (
      <div className="smm-main">
        <h2>Client Management</h2>

        <div className="smm-filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Statuses</option>
            {statuses.map((status, idx) => (
              <option key={idx} value={status}>{status}</option>
            ))}
          </select>

          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            placeholderText="Filter by date"
            className="form-control"
          />
        </div>
        <div className="smm-analytics">
        <div className="analytics-charts">
  <div className="chart-box">
    <h4>Bookings Over Time</h4>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={lineChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  <div className="chart-box">
    <h4>Bookings by Status</h4>
    <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={statusCountData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      // Removed label prop here
    >
      {statusCountData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={statusColors[entry.name] || '#ccc'} />
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="vertical" align="right" verticalAlign="middle" />
  </PieChart>
</ResponsiveContainer>

  </div>
</div>

</div>


        {/* Table */}
<table className="smm-table">
  <thead>
    <tr>
      <th>Booking ID</th>
      <th>Phone Number</th>
      <th>Service</th>
      <th>Status</th>
      <th>Booking Date</th>
      <th>Update</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentData.length === 0 ? (
      <tr>
        <td colSpan="6" className="text-center">No bookings found</td>
      </tr>
    ) : (
      currentData.map((b) => (
        <tr key={b.id}>
          <td>{b.id}</td>
          <td>{b.number}</td>
          <td>{b.service}</td>
          <td><span className={`badge ${getBadgeClass(b.status)}`}>{b.status}</span></td>
                  
          <td>{b.date}</td>
          <td>
                    <select value={b.status} onChange={(e) => handleStatusChange(b.id, e.target.value)}>
                      {statuses.map((status, i) => (
                        <option key={i} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
          <td>
            <button className="smm-view-btn" onClick={() => handleOpenModal(b)}>
              <FaEye /> View
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

{/* Pagination */}
<div className="pagination">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
      onClick={() => paginate(index + 1)}
    >
      {index + 1}
    </button>
  ))}
</div>
        
        {showModal && (
  <div className="smm-modal-overlay">
    <div className="smm-modal">
      <div className="smm-modal-header">
        Booking Details
        <button className="smm-modal-close" onClick={handleCloseModal}>×</button>
      </div>
      {selectedBooking && (
        <div className="smm-modal-body">
          <p><strong>Booking ID:</strong> {selectedBooking.id}</p>
          <p><strong>Phone number:</strong> {selectedBooking.number}</p>
          <p><strong>Date:</strong> {selectedBooking.date}</p>
          <p><strong>Service:</strong> {selectedBooking.service}</p>
          <p><strong>Status:</strong> {selectedBooking.status}</p>
        </div>
      )}
      <div className="smm-modal-footer">
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  </div>
)}

      </div>)}
      {activeSection === "project" && (
  <div className="smm-main">
  <h2>Projects</h2>
  <table className="smm-table">
    <thead>
      <tr>
        <th>Booking ID</th>
        <th>Services</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {currentData.length === 0 ? (
      <tr>
        <td colSpan="6" className="text-center">No bookings found</td>
      </tr>
    ) : (
      currentData.map((b) => (
        <tr key={b.id}>
          <td>{b.id}</td>
        
          <td>{b.service}</td>
          <td><span className={`badge ${getBadgeClass(b.status)}`}>{b.status}</span></td>
          <td><button onClick={() => handleView(b)}>View</button></td>
        </tr>
      ))
    )}
    </tbody>
  </table>

    
{/* Pagination */}
<div className="pagination">
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
      onClick={() => paginate(index + 1)}
    >
      {index + 1}
    </button>
  ))}
</div>    
  {/* MODAL */}
  {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3 className="modal-title">Booking Details</h3>
      <div className="form-grid">

        <div className="form-row">
          <label>Booking ID:
            <input type="text" value={formData.bookingId} readOnly />
          </label>
          <label>Date of Service:
            <input
              type="date"
              className="date-input"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
            />
          </label>
        </div>

        <div className="form-row time-section">
          {renderTimePicker('Start Time', startTime, setStartTime)}
          {renderTimePicker('End Time', endTime, setEndTime)}
          <div className="time-summary">
            <label>Total Booking Hours
              <input type="text" value={bookingHours ? `${bookingHours} hour(s)` : ''} readOnly />
            </label>
            <label>Total Cost
              <input type="text" value={totalCost ? `₹${totalCost}` : ''} readOnly />
            </label>
          </div>
        </div>

        <div className="form-row">
          <label>Service Requested:
            <select value={formData.service} onChange={(e) => handleChange('service', e.target.value)} disabled={isReadonly}>
              <option>Photography</option>
              <option>Videography</option>
              <option>Photo & Video Editing</option>
              <option>Graphic Designing</option>
            </select>
          </label>
          <label>People:
            <select value={formData.people} onChange={(e) => handleChange('people', e.target.value)} disabled={isReadonly}>
              {[...Array(100).keys()].map((n) => <option key={n + 1}>{n + 1}</option>)}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>Address:
            <input type="text" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} disabled={isReadonly} />
          </label>
          <label>Phone:
            <input type="text" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} disabled={isReadonly} />
          </label>
        </div>

        <div className="form-row">
          <label>Email:
            <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} disabled={isReadonly} />
          </label>
          <label>Instructions:
            <textarea value={formData.instructions} onChange={(e) => handleChange('instructions', e.target.value)} disabled={isReadonly}></textarea>
          </label>
        </div>

        <div className="form-row">
          <label>Rate Us:
            <div className="star-rating">{renderStarRating()}</div>
          </label>
        </div>
      </div>

      <div className="button-row">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleEdit}>Edit</button>
        {!quotationGenerated ? (
  <button onClick={handleGenerateQuotation}>Generate Quotation</button>
) : (
  <button onClick={handleViewQuotation}>View Quotation</button>
)}

        <button disabled={!quotationGenerated} onClick={handleRequestPayment}>Request Payment</button>
        <button disabled={!paymentRequested} onClick={handleAssignTask}>Assign Task</button>
        <button onClick={() => setShowModal(false)}>Close</button>

      </div>
    </div>
  </div>
)}
{showQuotationModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <QuotationTemplate ref={printRef} />
      <div className="button-row" style={{ marginTop: '1rem' }}>
        <ReactToPrint
          trigger={() => <button>Download / Print</button>}
          content={() => printRef.current}
        />
        <button onClick={() => setShowQuotationModal(false)}>Close</button>
      </div>
    </div>
  </div>
)}

      </div>)}
  {activeSection === "task" && (
  <div className="smm-main">
  <div className="task-bookings-container">
      <div className="task-filter-section">
        <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}>
          <option value="All">All Services</option>
          <option value="Photography">Photography</option>
          <option value="Videography">Videography</option>
          <option value="Photoediting">Photoediting</option>
          <option value="Videoediting">Videoediting</option>
          <option value="Graphic Designing">Graphic Designing</option>
        </select>

        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />

        <button onClick={() => openModal()}>Employees</button>
      </div>

      <table className="task-bookings-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Assign To</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.service}</td>
              <td>{booking.date}</td>
              <td>{booking.status}</td>
              <td>{booking.assignedTo.join(', ')}</td>
              <td>
                <button classname = "task-button" onClick={() => openModal(booking)}>Edit</button>
                <button classname = "task-button" onClick={() => handleDelete(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="task-pagination">
        {Array.from({ length: totalPage }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? 'task-active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>

      {showModal && selectedBooking && (
        <div className="task-modal">
          <div className="task-modal-content">
            <div className="task-modal-header">
              <h2>Select Employees</h2>
              <button className="task-close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="task-employee-filter">
              {['All', 'Photography', 'Videography', 'Photoediting', 'Videoediting', 'Graphic Designing'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setEmployeeFilter(filter)}
                  className={employeeFilter === filter ? 'task-filter-btn-active' : ''}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="task-employee-list">
              {employeesList
                .filter(emp => employeeFilter === 'All' || emp.service === employeeFilter)
                .map(emp => (
                  <div key={emp.id} className="task-employee-item">
                    <input
                      type="checkbox"
                      checked={selectedBooking.assignedEmployeeIds.includes(emp.id)}
                      onChange={() => toggleEmployee(emp.id)}
                    />
                    <label>{emp.name} ({emp.service})</label>
                  </div>
                ))}
            </div>

            <button className="task-save-btn" onClick={handleAssign}>Save</button>
          </div>
        </div>
      )}
    </div>
 
  </div>
)}
      {activeSection === "analytics" && (
<div className="smm-main">
  <div className="dashboard-container">
      <h2>Analytics</h2>

      {/* Buttons */}
      <div className="tabs">
        <button className={activeTab === 'clients' ? 'active' : ''} onClick={() => setActiveTab('clients')}>Clients</button>
        <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Projects</button>
        <button className={activeTab === 'employees' ? 'active' : ''} onClick={() => setActiveTab('employees')}>Employees</button>
      </div>

      {/* Filter Buttons */}
      <div className="filters">
  <button onClick={() => applyFilter('15days')}>Last 15 Days</button>
  <button onClick={() => applyFilter('30days')}>Last 30 Days</button>
  <button onClick={() => setShowCustomDate(true)}>Custom</button>

  {showCustomDate && (
    <div className="custom-date-picker">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          setEndDate(date);
          applyCustomDateRange(startDate, date); // Apply filter when both dates selected
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
      />
    </div>
  )}
</div>


      {/* Graphs based on selected tab */}
      <div className="charts-section">
        {activeTab === 'clients' && (
          <>
           <div className="charts-row">
           <div className="chart-box">
            <h4>Clients: Services Booked</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
             </div>

             <div className="chart-box">
            <h4>Clients: Status Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={statusCountData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      // Removed label prop here
    >
      {statusCountData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={statusColors[entry.name] || '#ccc'} />
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="vertical" align="right" verticalAlign="middle" />  </PieChart>
</ResponsiveContainer>
            </div>
            </div>
          </>
        )}

        {activeTab === 'projects' && (
          <>
          <div className="charts-row">
          <div className="chart-box">
            <h4>Projects Overview</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Pending', value: 20 },
                { name: 'Completed', value: 80 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
            </div>
            <div className="chart-box">
            <h4>Projects Completion</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={[
                  { name: 'Completed', value: 80 },
                  { name: 'Pending', value: 20 }
                ]} dataKey="value" nameKey="name" outerRadius={100} fill="#4caf50" label>
                  <Cell fill="#4caf50" />
                  <Cell fill="#f44336" />
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="bottom" /> 
              </PieChart>
            </ResponsiveContainer>
            </div>
            </div>
          </>
        )}

        {activeTab === 'employees' && (
          <>
          <div className="charts-row">
          <div className="chart-box">
            <h4>Employee Assignments</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={[
                { name: 'Photography', assignments: 12 },
                { name: 'Videography', assignments: 10 },
                { name: 'Photoediting', assignments: 8 },
                { name: 'Videoediting', assignments: 6 },
                { name: 'Graphic Designing', assignments: 5 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="assignments" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            </div>

            <div className="chart-box">
            <h4>Employees: Service Type</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={[
                  { name: 'Photography', value: 12 },
                  { name: 'Videography', value: 10 },
                  { name: 'Photoediting', value: 8 },
                  { name: 'Videoediting', value: 6 },
                  { name: 'Graphic Designing', value: 5 },
                ]} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                  {COLORS.map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="bottom" />  </PieChart>
            </ResponsiveContainer>
            </div>
        </div>
          </>
        )}
      </div>

    </div>
      </div>)}

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
};


const getBadgeClass = (status) => {
  switch (status) {
    case 'Delivered':
    case 'Payment received':
      return 'bg-success';
    case 'Quotation sent by YGP':
    case 'Quotation approved by customer':
      return 'bg-info text-dark';
    case 'Service Booked':
    case 'Service Under Review':
      return 'bg-warning text-dark';
    case 'Under Fulfillment':
      return 'bg-secondary';
    default:
      return 'bg-danger'; // Default case for unknown statuses
  }
};


export default SMMDashboard;
