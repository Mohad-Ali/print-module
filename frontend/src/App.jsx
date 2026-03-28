import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./components/Upload.jsx";
import Orders from "./components/Orders.jsx";
import LoadingPage from "./components/LoadingPage.jsx";
import { Toaster } from "react-hot-toast";
import gsap from "gsap";

const App = () => {
  const [loading, setLoading] = useState(true);
  const followerRef = useRef(null);

  // Handle Loading Page
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // hide loading after 2.5s
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Global mouse follower
  useEffect(() => {
    const follower = followerRef.current;
    if (!follower) return;

    const moveFollower = (e) => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const show = () => gsap.to(follower, { scale: 1, duration: 0.3 });
    const hide = () => gsap.to(follower, { scale: 0, duration: 0.3 });

    document.addEventListener("mousemove", moveFollower);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      document.removeEventListener("mousemove", moveFollower);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, [loading]); // trigger after loading finishes

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Router>
          {/* Global mouse follower */}
          <div
            ref={followerRef}
            className="w-16 h-16 rounded-full bg-blue-400/40 fixed z-50 pointer-events-none mix-blend-difference"
            style={{ transform: "translate(-50%, -50%) scale(0)" }}
          />

          <Toaster position="top-right" reverseOrder={false} />

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
      )}
    </>
  );
};

export default App;