import React, { useState } from "react";
import { DUMMY_USERS } from "../data/dummyData";
import {
  IconBrand,
  IconMail,
  IconLock,
  IconGitHub,
  IconGitLab,
  IconArrowRight,
  IconShield,
} from "./Icons";

export default function LoginPage({ setCurrentView, onLoginSuccess, showToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Quick autofill helper for the dummy accounts
  const handleSelectDemoUser = (user) => {
    setEmail(user.email);
    setPassword("password123");
    setErrorMessage("");
    showToast(`Loaded credentials for ${user.name} (${user.role})`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter an email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter a password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const matchedUser = DUMMY_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase().trim()
      );

      if (matchedUser) {
        onLoginSuccess(matchedUser);
        showToast(`Welcome back, ${matchedUser.name}!`);
        setCurrentView("dashboard");
      } else {
        if (email.includes("@")) {
          const newUser = {
            id: `usr-${Date.now()}`,
            name: email.split("@")[0].replace(".", " ").replace(/^./, (s) => s.toUpperCase()),
            email: email.trim(),
            role: "Software Developer",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
            initials: email.substring(0, 2).toUpperCase(),
            activeSprints: 1,
            completedTasks: 8,
          };
          onLoginSuccess(newUser);
          showToast(`Welcome to DevTrack demo, ${newUser.name}`);
          setCurrentView("dashboard");
        } else {
          setErrorMessage("Invalid credentials. Try selecting a demo persona below.");
        }
      }
    }, 350);
  };

  const handleOAuthLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const demoUser = DUMMY_USERS[0];
      onLoginSuccess(demoUser);
      showToast(`Authenticated via ${provider}! Logged in as ${demoUser.name}`);
      setCurrentView("dashboard");
    }, 350);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-md relative">
        {/* Subtle glow border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-2xl blur-sm pointer-events-none"></div>

        <div className="relative bg-[#0c0c0e] border border-[#2a2a2e] rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 mb-2 focus:outline-none"
              onClick={() => setCurrentView("landing")}
              aria-label="DevTrack Home"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-black">
                <IconBrand className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-[#fafafa]">DevTrack</span>
            </button>
            <h1 className="text-xl font-bold text-[#fafafa]">Sign In to Workspace</h1>
            <p className="text-xs text-[#a1a1aa] mt-1">
              Select a demo persona or enter test credentials to test the dashboard.
            </p>
          </div>

          {/* Quick Demo Persona Autofill Chips */}
          <div className="bg-[#141417] border border-[#26262a] rounded-xl p-3 mb-5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-sky-400 mb-2">
              <span>⚡ One-Click Demo Personas:</span>
              <span className="text-[#71717a] font-normal">Click to fill</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DUMMY_USERS.map((usr) => (
                <button
                  key={usr.id}
                  type="button"
                  className="flex flex-col text-left p-2 rounded-lg bg-[#1a1a1e] hover:bg-[#222228] border border-[#2a2a30] hover:border-sky-400/50 transition-colors cursor-pointer"
                  onClick={() => handleSelectDemoUser(usr)}
                >
                  <span className="text-xs font-semibold text-[#fafafa] leading-tight">
                    {usr.name}
                  </span>
                  <span className="text-[10px] text-[#a1a1aa] truncate">{usr.role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[#2a2a2e] bg-[#141416] hover:bg-[#1a1a1e] text-xs font-medium text-[#fafafa] transition-colors"
              onClick={() => handleOAuthLogin("GitHub")}
              disabled={isLoading}
            >
              <IconGitHub className="w-4 h-4" />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[#2a2a2e] bg-[#141416] hover:bg-[#1a1a1e] text-xs font-medium text-[#fafafa] transition-colors"
              onClick={() => handleOAuthLogin("GitLab")}
              disabled={isLoading}
            >
              <IconGitLab className="w-4 h-4" />
              <span>GitLab</span>
            </button>
          </div>

          <div className="flex items-center my-4 text-[#555] text-[11px] uppercase tracking-wider font-mono">
            <div className="flex-1 h-px bg-[#26262a]"></div>
            <span className="px-3">or credentials</span>
            <div className="flex-1 h-px bg-[#26262a]"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="user-email" className="block text-xs font-medium text-[#fafafa] mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#71717a] pointer-events-none">
                  <IconMail className="w-4 h-4" />
                </span>
                <input
                  id="user-email"
                  type="email"
                  required
                  placeholder="name@devtrack.io"
                  className="w-full bg-[#121214] border border-[#2a2a2e] focus:border-sky-400 rounded-lg py-2 pl-9 pr-3 text-sm text-[#fafafa] placeholder-[#555] transition-colors"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="user-password" className="text-xs font-medium text-[#fafafa]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] text-sky-400 hover:underline"
                  onClick={() => {
                    setPassword("password123");
                    showToast("Password set to 'password123'");
                  }}
                >
                  Fill default
                </button>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#71717a] pointer-events-none">
                  <IconLock className="w-4 h-4" />
                </span>
                <input
                  id="user-password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#121214] border border-[#2a2a2e] focus:border-sky-400 rounded-lg py-2 pl-9 pr-3 text-sm text-[#fafafa] placeholder-[#555] transition-colors"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                {errorMessage}
              </div>
            )}

            <label className="flex items-center gap-2 text-xs text-[#a1a1aa] cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-sky-400"
              />
              <span>Remember demo session</span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#fafafa] hover:bg-white text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In & Open Dashboard</span>
                  <IconArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Return link */}
          <div className="text-center mt-5">
            <button
              type="button"
              className="text-xs text-[#71717a] hover:text-[#fafafa] transition-colors"
              onClick={() => setCurrentView("landing")}
            >
              ← Return to Project Overview
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-[#1f1f23] flex items-center justify-center gap-2 text-[11px] text-[#71717a]">
            <IconShield className="w-3.5 h-3.5 text-emerald-400" />
            <span>WCAG 2.2 AA Keyboard Accessible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
