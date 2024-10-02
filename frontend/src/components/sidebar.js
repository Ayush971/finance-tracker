import React from 'react';
import '../styles/Sidebar.css';
import { FaCreditCard, FaHouseUser, FaSlidersH, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src="https://i.pravatar.cc/100" alt="User" className="profile-img" />
        <h3>Janice Chandler</h3>
      </div>
      <ul className="menu">
        <li><Link to="/home"><i className="home-icon"><FaHouseUser/></i><span>Home</span></Link></li>
        <li><Link to="/expenses"><i className="expenses-icon"><FaCreditCard/></i><span>Expenses</span></Link></li>
        <li><Link to="/settings"><i className="settings-icon"><FaSlidersH/></i><span>Settings</span></Link></li>
        <li><Link to="/login"><i className="support-icon"><FaSignOutAlt/></i><span>Sign Out</span></Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
