import React from "react";
import { IconBrand } from "./Icons";

export default function Navbar({ currentView, setCurrentView, currentUser, onLogout }) {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#262626] px-4 sm:px-6 h-16 flex items-center">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          className="flex items-center gap-2.5 bg-transparent border-0 text-[#fafafa] font-bold text-lg cursor-pointer focus:outline-none"
          onClick={() => setCurrentView("landing")}
          aria-label="DevTrack Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20 text-black">
            <IconBrand className="w-5 h-5" />
          </div>
          <span className="tracking-tight">DevTrack</span>
          <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#171717] border border-[#333333] text-sky-400 px-2 py-0.5 rounded-full">
            Portfolio
          </span>
        </button>

        {/* Navigation links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
          <button
            type="button"
            className={`text-sm font-medium transition-colors ${
              currentView === "landing" ? "text-sky-400" : "text-[#a1a1aa] hover:text-[#fafafa]"
            }`}
            onClick={() => setCurrentView("landing")}
          >
            Overview
          </button>
          <a
            href="#features"
            className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            onClick={(e) => {
              if (currentView !== "landing") {
                setCurrentView("landing");
                setTimeout(() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          >
            Features
          </a>
          <a
            href="#techstack"
            className="text-sm font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
            onClick={(e) => {
              if (currentView !== "landing") {
                setCurrentView("landing");
                setTimeout(() => {
                  document.getElementById("techstack")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
          >
            Tech Stack
          </a>
          <button
            type="button"
            className={`text-sm font-medium transition-colors ${
              currentView === "dashboard" ? "text-sky-400" : "text-[#a1a1aa] hover:text-[#fafafa]"
            }`}
            onClick={() => setCurrentView("dashboard")}
          >
            Live Kanban Demo
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#333333] bg-[#171717] hover:border-[#4f4f56] text-sm text-[#fafafa] transition-colors"
                onClick={() => setCurrentView("dashboard")}
                title="Go to authenticated dashboard"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-medium text-xs">{currentUser.name.split(" ")[0]}</span>
              </button>
              <button
                type="button"
                className="text-xs text-[#a1a1aa] hover:text-red-400 px-2 py-1 transition-colors"
                onClick={onLogout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              {currentView === "login" ? (
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-[#333333] bg-transparent hover:bg-[#171717] text-xs font-semibold text-[#fafafa] transition-colors"
                  onClick={() => setCurrentView("landing")}
                >
                  Back to Overview
                </button>
              ) : (
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-[#333333] bg-transparent hover:bg-[#171717] text-xs font-semibold text-[#fafafa] transition-colors"
                  onClick={() => setCurrentView("login")}
                >
                  Sign In
                </button>
              )}
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-[#fafafa] hover:bg-white text-black text-xs font-bold transition-all shadow-sm hover:shadow-sky-500/10"
                onClick={() => setCurrentView(currentUser ? "dashboard" : "login")}
              >
                Try Live Demo
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
