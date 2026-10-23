import React, { useState } from "react";
import {
  DUMMY_PROJECTS,
  INITIAL_TASKS,
  CORE_FEATURES,
} from "../data/dummyData";
import {
  IconGit,
  IconShield,
  IconZap,
  IconTerminal,
  IconChart,
  IconUsers,
  IconArrowRight,
  IconBrand,
  IconCheck,
} from "./Icons";

export default function LandingPage({ setCurrentView }) {
  const [activeTab, setActiveTab] = useState("kanban");
  const [tasks] = useState(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState(null);

  // Group tasks by status for the hero preview
  const todoTasks = tasks.filter((t) => t.status === "todo");
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress");
  const reviewTasks = tasks.filter((t) => t.status === "review");
  const doneTasks = tasks.filter((t) => t.status === "done");

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case "git":
        return <IconGit className="w-5 h-5 text-sky-400" />;
      case "shield":
        return <IconShield className="w-5 h-5 text-emerald-400" />;
      case "zap":
        return <IconZap className="w-5 h-5 text-amber-400" />;
      case "terminal":
        return <IconTerminal className="w-5 h-5 text-indigo-400" />;
      case "chart":
        return <IconChart className="w-5 h-5 text-purple-400" />;
      case "users":
        return <IconUsers className="w-5 h-5 text-pink-400" />;
      default:
        return <IconZap className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <div className="relative z-10 flex flex-col gap-16 sm:gap-24 pb-20">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 text-center flex flex-col items-center">
        {/* Release Pill Badge */}
        <button
          type="button"
          onClick={() => setCurrentView("dashboard")}
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#333333] bg-[#171717] hover:border-sky-400 text-xs text-[#a1a1aa] mb-6 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span className="font-medium text-sky-400">Portfolio Showcase</span>
          <span className="text-[#555]">•</span>
          <span className="text-[#fafafa]">DevTrack v2.4 Architecture</span>
          <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight mb-4 text-[#fafafa]">
          Project Management Built For{" "}
          <span className="bg-gradient-to-r from-[#fafafa] via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Velocity
          </span>
          . Zero Clutter.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-[#a1a1aa] max-w-2xl mb-8 leading-relaxed">
          A modern project tracking application built with React and Tailwind CSS.
          Features sprint backlogs, interactive Kanban workflows, role-based dummy access,
          and WCAG 2.2 AA compliant keyboard navigation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#fafafa] hover:bg-white text-black font-semibold text-sm transition-all shadow-lg shadow-white/5 cursor-pointer"
            onClick={() => setCurrentView("login")}
          >
            <span>Sign In / Demo Accounts</span>
            <IconArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#333333] bg-[#0d0d0f] hover:bg-[#171717] hover:border-[#4f4f56] text-[#fafafa] font-semibold text-sm transition-colors cursor-pointer"
            onClick={() => setCurrentView("dashboard")}
          >
            <span>Launch Kanban Demo</span>
          </button>
        </div>

        {/* =========================================================================
            INTERACTIVE KANBAN PREVIEW MOCKUP
            ========================================================================= */}
        <div className="w-full max-w-5xl relative">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-sky-500/20 via-indigo-500/10 to-transparent rounded-2xl blur-sm pointer-events-none"></div>

          <div className="relative z-10 bg-[#0c0c0e] border border-[#2a2a2e] rounded-2xl overflow-hidden shadow-2xl text-left">
            {/* Header / Window controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#141416] border-b border-[#26262a]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <div className="font-mono text-xs text-[#71717a] flex items-center gap-2">
                <IconTerminal className="w-3.5 h-3.5 text-sky-400" />
                <span>devtrack.workspace / sprint-42-core-engine</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                150ms Instant
              </span>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0d0d0f] border-b border-[#1f1f23]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-[#1f1f23] border border-[#333] flex items-center justify-center font-bold text-xs text-sky-400">
                  ENG
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-[#fafafa]">
                    DevTrack Core Engine v3.0
                  </div>
                  <div className="text-[11px] text-[#71717a]">
                    Active Sprint 42 • 4 days remaining • 78% completed
                  </div>
                </div>
              </div>

              {/* View switch tabs */}
              <div className="flex bg-[#000000] p-1 rounded-lg border border-[#26262a]">
                <button
                  type="button"
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    activeTab === "kanban"
                      ? "bg-[#1f1f23] text-[#fafafa] font-semibold"
                      : "text-[#71717a] hover:text-[#a1a1aa]"
                  }`}
                  onClick={() => setActiveTab("kanban")}
                >
                  Sprint Board
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                    activeTab === "projects"
                      ? "bg-[#1f1f23] text-[#fafafa] font-semibold"
                      : "text-[#71717a] hover:text-[#a1a1aa]"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  Projects ({DUMMY_PROJECTS.length})
                </button>
              </div>
            </div>

            {/* Tab: Kanban Board */}
            {activeTab === "kanban" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-[#08080a] min-h-[360px] overflow-x-auto">
                {/* Column: To Do */}
                <div className="bg-[#121214] border border-[#222225] rounded-xl p-3 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#a1a1aa] pb-2 border-b border-white/5">
                    <span>Backlog / To Do</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#1a1a1e] text-[#71717a]">
                      {todoTasks.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {todoTasks.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 bg-[#18181c] hover:bg-[#1e1e24] border border-[#2a2a2f] rounded-lg transition-all cursor-pointer"
                        onClick={() => setSelectedTask(t)}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-mono text-sky-400 font-semibold">{t.id}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400">
                            {t.priority}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-[#fafafa] mb-2 leading-snug">
                          {t.title}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#71717a]">
                          <span className="font-mono text-[10px] bg-[#121214] px-1.5 py-0.5 rounded text-[#a1a1aa]">
                            {t.branch}
                          </span>
                          <img
                            src={t.assigneeAvatar}
                            alt={t.assignee}
                            className="w-5 h-5 rounded-full border border-[#333]"
                            title={t.assignee}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: In Progress */}
                <div className="bg-[#121214] border border-[#222225] rounded-xl p-3 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-sky-400 pb-2 border-b border-white/5">
                    <span>In Progress</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#1a1a1e] text-sky-400">
                      {inProgressTasks.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {inProgressTasks.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 bg-[#18181c] hover:bg-[#1e1e24] border border-sky-500/30 rounded-lg transition-all cursor-pointer"
                        onClick={() => setSelectedTask(t)}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-mono text-sky-400 font-semibold">{t.id}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400">
                            {t.priority}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-[#fafafa] mb-2 leading-snug">
                          {t.title}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#71717a]">
                          <span className="font-mono text-[10px] bg-[#121214] px-1.5 py-0.5 rounded text-[#a1a1aa]">
                            {t.branch}
                          </span>
                          <img
                            src={t.assigneeAvatar}
                            alt={t.assignee}
                            className="w-5 h-5 rounded-full border border-[#333]"
                            title={t.assignee}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: Review */}
                <div className="bg-[#121214] border border-[#222225] rounded-xl p-3 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-400 pb-2 border-b border-white/5">
                    <span>Code Review</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#1a1a1e] text-amber-400">
                      {reviewTasks.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {reviewTasks.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 bg-[#18181c] hover:bg-[#1e1e24] border border-[#2a2a2f] rounded-lg transition-all cursor-pointer"
                        onClick={() => setSelectedTask(t)}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-mono text-sky-400 font-semibold">{t.id}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">
                            {t.priority}
                          </span>
                        </div>
                        <div className="text-xs font-medium text-[#fafafa] mb-2 leading-snug">
                          {t.title}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#71717a]">
                          <span className="font-mono text-[10px] bg-[#121214] px-1.5 py-0.5 rounded text-[#a1a1aa]">
                            {t.branch}
                          </span>
                          <img
                            src={t.assigneeAvatar}
                            alt={t.assignee}
                            className="w-5 h-5 rounded-full border border-[#333]"
                            title={t.assignee}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column: Done */}
                <div className="bg-[#121214] border border-[#222225] rounded-xl p-3 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 pb-2 border-b border-white/5">
                    <span>Completed</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#1a1a1e] text-emerald-400">
                      {doneTasks.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {doneTasks.map((t) => (
                      <div
                        key={t.id}
                        className="p-3 bg-[#18181c] opacity-80 border border-[#2a2a2f] rounded-lg transition-all cursor-pointer"
                        onClick={() => setSelectedTask(t)}
                      >
                        <div className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="font-mono text-emerald-400 font-semibold">{t.id}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                            DONE
                          </span>
                        </div>
                        <div className="text-xs font-medium text-[#a1a1aa] line-through mb-2 leading-snug">
                          {t.title}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-[#71717a]">
                          <span className="font-mono text-[10px] bg-[#121214] px-1.5 py-0.5 rounded text-[#a1a1aa]">
                            {t.branch}
                          </span>
                          <img
                            src={t.assigneeAvatar}
                            alt={t.assignee}
                            className="w-5 h-5 rounded-full border border-[#333]"
                            title={t.assignee}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Projects List */}
            {activeTab === "projects" && (
              <div className="p-4 sm:p-6 flex flex-col gap-3 bg-[#08080a]">
                {DUMMY_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#141416] border border-[#26262a] rounded-xl"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-semibold">
                          {proj.key}
                        </span>
                        <span className="text-sm font-semibold text-[#fafafa]">{proj.name}</span>
                      </div>
                      <p className="text-xs text-[#a1a1aa] mt-1">{proj.description}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[11px] text-[#71717a]">Velocity Health</div>
                        <span className="text-xs font-medium text-emerald-400">{proj.health}</span>
                      </div>
                      <div className="w-28">
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-[#71717a]">Progress</span>
                          <span className="text-sky-400 font-mono">{proj.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-400 rounded-full"
                            style={{ width: `${proj.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TECH STACK & ARCHITECTURE (PORTFOLIO VALUE)
          ========================================================================= */}
      <section id="techstack" className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="font-mono text-xs text-sky-400 uppercase tracking-widest font-semibold mb-2">
            Technical Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#fafafa]">
            Modern Architecture & Best Practices
          </h2>
          <p className="text-sm text-[#a1a1aa] mt-2">
            Built following modular principles, utility-first CSS styling, and accessible keyboard standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#0d0d0f] border border-[#26262a] flex flex-col gap-2">
            <div className="font-mono text-xs text-sky-400 font-semibold">01 / FRONTEND</div>
            <h3 className="text-base font-bold text-[#fafafa]">React 18 + Vite</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Component-driven design with reactive hooks for state tracking and sub-second HMR delivery.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d0d0f] border border-[#26262a] flex flex-col gap-2">
            <div className="font-mono text-xs text-indigo-400 font-semibold">02 / STYLING</div>
            <h3 className="text-base font-bold text-[#fafafa]">Tailwind CSS v3</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Utility-first styling with tokenized surfaces, sleek dark mode, and 150ms motion timing.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d0d0f] border border-[#26262a] flex flex-col gap-2">
            <div className="font-mono text-xs text-emerald-400 font-semibold">03 / ACCESSIBILITY</div>
            <h3 className="text-base font-bold text-[#fafafa]">WCAG 2.2 AA Standards</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Accessible keyboard navigation, explicit focus-visible rings, and high contrast palette tokens.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d0d0f] border border-[#26262a] flex flex-col gap-2">
            <div className="font-mono text-xs text-amber-400 font-semibold">04 / DATA MODEL</div>
            <h3 className="text-base font-bold text-[#fafafa]">Agile & Kanban Engine</h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Simulated multi-role sprints, ticket workflow status transitions, and branch-ticket linkage.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE FEATURES
          ========================================================================= */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="font-mono text-xs text-sky-400 uppercase tracking-widest font-semibold mb-2">
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#fafafa]">
            Features Designed for Developer Velocity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CORE_FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="p-6 rounded-xl bg-[#0c0c0e] border border-[#26262a] hover:border-[#38bdf8]/40 transition-all flex flex-col gap-2.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#17171a] border border-[#333] flex items-center justify-center">
                {getFeatureIcon(feat.icon)}
              </div>
              <div className="font-mono text-[11px] text-[#71717a] tracking-wider uppercase font-semibold">
                {feat.tag}
              </div>
              <h3 className="text-base font-bold text-[#fafafa]">{feat.title}</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          CLEAN PORTFOLIO FOOTER
          ========================================================================= */}
      <footer className="border-t border-[#26262a] pt-10 mt-6 max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-sky-400 flex items-center justify-center text-black font-bold text-[10px]">
            D
          </div>
          <span className="text-[#fafafa] font-semibold">DevTrack</span>
          <span>— Portfolio Project Showcase</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hover:text-sky-400 transition-colors"
            onClick={() => setCurrentView("dashboard")}
          >
            Live Kanban
          </button>
          <button
            type="button"
            className="hover:text-sky-400 transition-colors"
            onClick={() => setCurrentView("login")}
          >
            Sign In Page
          </button>
          <span>Inter & Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
