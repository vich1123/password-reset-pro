import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
