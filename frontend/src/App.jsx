import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./components/Upload.jsx";
import Orders from "./components/Orders.jsx";

const App = () => {
  return (
    <Router>
      {/* Navigation */}
      <nav className="bg-blue-600 p-4 text-white flex justify-around shadow-md">
        <Link className="hover:text-sky-200 font-semibold" to="/">Upload PDF</Link>
        <Link className="hover:text-sky-200 font-semibold" to="/orders">Orders List</Link>
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
};

export default App;