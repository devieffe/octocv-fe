import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="dashboard admin">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>

      <h3>Users list</h3>

      <div>
        <ul>
        <li>#</li>
          <li>User name -email-, registered -date-</li>
          <li>Quizzes -0/1-</li>
          <li>CVs type</li>
        </ul>
      </div>

      <div>
        <ul>
        <li>1.</li>
          <li>Full name <span>name@email.com</span> <em>-10.10.2025-</em></li>
          <li>OK</li>
          <li>Full-stack</li>
        </ul>
      </div>

      <div>
        <ul>
        <li>2.</li>
          <li>Full name <span>name@email.com</span> <em>-10.10.2025-</em></li>
          <li>-</li>
          <li>-</li>
        </ul>
      </div>

      <div>
        <ul>
        <li>3.</li>
          <li>Full name <span>name@email.com</span> <em>-10.10.2025-</em></li>
          <li>OK</li>
          <li>Data</li>
        </ul>
      </div>


<div>
  <Link to="/logout">Log out</Link>
</div>
    </div>
  );
};

export default AdminDashboard;
