import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDashboard from "./Components/User/user-dashboard";
import AdminDashboard from "./Components/Admin/admin-dashboard";

const App = () => {
  const isAdmin = false;  // Change this to `true` for the admin view.

  return (
    <Router>
      <Routes>
        <Route path="/admin">
          {isAdmin ? <AdminDashboard /> : <div>You do not have access to this page.</div>}
        </Route>
        <Route path="/user">
          <UserDashboard />
        </Route>
        <Route path="/">
          <div>Please select a role to view the dashboard.</div>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;