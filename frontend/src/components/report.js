import React, { useState } from 'react';

function Report({ show, handleClose, generateReport }) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [days, setDays] = useState('');

  const handleGenerate = () => {
    generateReport(selectedMonth, days); 
    handleClose();
  };

  return (
    show && (
      <div className="modal">
        <div className="modal-content">
          <h3>Select Report Range</h3>
          <label>Choose Month: </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <br />
          <label>Or Days from Today: </label>
          <input
            type="number"
            placeholder="Enter days (e.g. 30)"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
          <br />
          <button onClick={handleGenerate}>Generate Report</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    )
  );
}

export default Report;
