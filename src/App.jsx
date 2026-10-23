import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import DashboardView from "./components/DashboardView";
import { DUMMY_USERS } from "./data/dummyData";

export default function App() {
  const [currentView, setCurrentView] = useState("landing"); // 'landing' | 'login' | 'dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3200);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("landing");
    showToast("Signed out of session.");
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-black text-[#fafafa] selection:bg-sky-500/30 selection:text-sky-300">
      {/* Subtle ambient visual glows */}
      <div className="ambient-glow" aria-hidden="true" />
      <div className="bg-grid-pattern" aria-hidden="true" />

      {/* Primary Navigation Bar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* View routing */}
      {currentView === "landing" && (
        <LandingPage setCurrentView={setCurrentView} />
      )}

      {currentView === "login" && (
        <LoginPage
          setCurrentView={setCurrentView}
          onLoginSuccess={handleLoginSuccess}
          showToast={showToast}
        />
      )}

      {currentView === "dashboard" && (
        <DashboardView
          currentUser={currentUser || DUMMY_USERS[0]}
          setCurrentView={setCurrentView}
          onLogout={handleLogout}
          showToast={showToast}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <aside
          className="fixed bottom-6 right-6 z-50 bg-[#17171a] border border-sky-400/40 text-[#fafafa] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-bounce"
          role="status"
          aria-live="polite"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400"></span>
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
}