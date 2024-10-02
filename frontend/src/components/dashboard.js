import React,{ useState }  from 'react';
import '../styles/Dashboard.css';
import Form from './form'
import ExpenseChart from '../subComponents/expenseChart';
import PieChart from '../subComponents/pieChart';
import RecentExpenses from '../subComponents/recentExpenses';
import Categories from '../subComponents/categories';
import Axios from 'axios'
import Report from './report';

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);


  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const openReportModal = () => setShowReportModal(true);
  const closeReportModal = () => setShowReportModal(false);

  const generateReport = (selectedMonth, days) => {
    const baseUrl = 'http://localhost:5000/api/v1/generate-report'; // Assuming you have a report route on the backend
    let url = baseUrl;
  
    if (selectedMonth) {
      url += `?month=${selectedMonth}`;
    } else if (days) {
      url += `?days=${days}`;
    }
  
    // Fetch the report from the server using Axios
    Axios.get(url, {
      responseType: 'blob', // Important to specify the response type as blob
    })
      .then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'Expense_Report.csv'; // Assuming you're sending a CSV
        a.click();
      })
      .catch((error) => {
        console.error('Error generating report:', error);
      });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        
        <Categories/>
        <RecentExpenses/>
      </div>
      <div className="quick-access">
        <h4>Quick Access</h4>
        <hr />
        <div className="quick-access-buttons">
          <button className="new-expense-btn" onClick={openForm}>+ New Expense</button>
          <button className="add-receipt-btn" >+ Add Debt</button>
          <button className="create-report-btn" onClick={openReportModal}>+ Create Report</button>
          <button className="create-trip-btn">+ Create Trip</button>
        </div>
      </div>

      <Form show={showForm} handleClose={closeForm}/>

      <Report show={showReportModal} handleClose={closeReportModal} generateReport={generateReport} />

      <div className="monthly-report">
        <div className="team-spending">
          <PieChart/>
        </div>
        <div className="day-expenses">
            <ExpenseChart/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
