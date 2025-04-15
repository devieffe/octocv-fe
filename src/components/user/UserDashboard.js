import React from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="dashboard admin">
      <h2>User Dashboard</h2>
      <p>Welcome, USER-FIRST-NAME</p>

      <div>
        <ul>
          <li>User name -editable?-</li>
          <li>Email -editable?-</li>
          <li>CVs type: <Link to="/download-cv">Download</Link></li>
        </ul>
      </div>

<div>
  <Link to="/logout">Log out</Link><br/>
  <Link to="/delete-account">Delete account</Link>
</div>
    </div>
  );
};

export default UserDashboard;