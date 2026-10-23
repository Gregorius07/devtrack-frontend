import React, { useState } from "react";
import { DUMMY_PROJECTS, INITIAL_TASKS } from "../data/dummyData";

export default function DashboardView({ currentUser, setCurrentView, onLogout, showToast }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [activeProject, setActiveProject] = useState(DUMMY_PROJECTS[0]);
  const [filterPriority, setFilterPriority] = useState("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter tasks based on priority
  const filteredTasks = tasks.filter((t) => {
    if (filterPriority === "all") return true;
    return t.priority === filterPriority;
  });

  const todoTasks = filteredTasks.filter((t) => t.status === "todo");
  const inProgressTasks = filteredTasks.filter((t) => t.status === "in-progress");
  const reviewTasks = filteredTasks.filter((t) => t.status === "review");
  const doneTasks = filteredTasks.filter((t) => t.status === "done");

  const moveTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Task ${taskId} moved to ${newStatus}`);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `${activeProject.key}-${Math.floor(100 + Math.random() * 900)}`,
      title: newTaskTitle.trim(),
      status: "todo",
      priority: "medium",
      points: 5,
      assignee: currentUser ? currentUser.name : "Alex Chen",
      assigneeAvatar: currentUser
        ? currentUser.avatar
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      branch: `feat/${newTaskTitle.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20)}`,
      tags: ["DevTrack", "Feature"],
      comments: 0,
      subtasks: { done: 0, total: 2 },
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    showToast(`Created task #${newTask.id}`);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full relative z-10">
      {/* Top Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#26262a]">
        <div className="flex items-center gap-3">
          <img
            src={
              currentUser?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
            }
            alt={currentUser?.name || "Demo User"}
            className="w-11 h-11 rounded-lg border border-[#333] object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#fafafa] leading-tight">
                {currentUser?.name || "Alex Chen"}
              </h1>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
                {currentUser?.role || "Lead Architect"}
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Active Project: <strong className="text-[#fafafa]">{activeProject.name}</strong> • Sprint 42
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-[#333] bg-[#141416] hover:bg-[#1f1f23] text-xs text-[#fafafa] transition-colors"
            onClick={() => setCurrentView("landing")}
          >
            ← View Overview
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg border border-transparent hover:bg-red-500/10 text-xs text-[#a1a1aa] hover:text-red-400 transition-colors"
            onClick={onLogout}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Project selector & Priority filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0c0c0e] border border-[#26262a] rounded-xl mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#71717a] mr-1">Project:</span>
          {DUMMY_PROJECTS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeProject.id === p.id
                  ? "bg-[#fafafa] text-black font-semibold"
                  : "bg-[#141417] text-[#a1a1aa] hover:text-[#fafafa] border border-[#2a2a2e]"
              }`}
              onClick={() => setActiveProject(p)}
            >
              <span className="font-mono mr-1.5">[{p.key}]</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#71717a] mr-1">Priority:</span>
          {["all", "high", "medium", "low"].map((prio) => (
            <button
              key={prio}
              type="button"
              className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                filterPriority === prio
                  ? "bg-sky-500/10 text-sky-400 border border-sky-500/30 font-medium"
                  : "text-[#71717a] hover:text-[#a1a1aa]"
              }`}
              onClick={() => setFilterPriority(prio)}
            >
              {prio}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Add Task Input */}
      <form
        onSubmit={handleAddTask}
        className="flex items-center gap-3 p-3 bg-[#121214] border border-[#26262a] rounded-xl mb-6"
      >
        <span className="text-sky-400 font-bold ml-1">+</span>
        <input
          type="text"
          placeholder={`Quick add task to ${activeProject.name} (e.g. Implement OAuth2 refresh token)...`}
          className="flex-1 bg-transparent text-xs sm:text-sm text-[#fafafa] placeholder-[#555] focus:outline-none"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button
          type="submit"
          className="px-3.5 py-1.5 rounded-lg bg-[#fafafa] hover:bg-white text-black text-xs font-semibold transition-colors"
        >
          Add Ticket
        </button>
      </form>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#08080a] p-4 rounded-2xl border border-[#26262a]">
        {/* Column 1: Backlog */}
        <div className="bg-[#121215] border border-[#222226] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#a1a1aa] pb-2 border-b border-white/5">
            <span>Backlog ({todoTasks.length})</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a1a1e] text-[#71717a]">
              Ready
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {todoTasks.map((t) => (
              <div
                key={t.id}
                className="p-3 bg-[#18181c] hover:bg-[#1e1e24] border border-[#2a2a30] rounded-lg transition-all cursor-pointer"
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
                  <button
                    type="button"
                    className="px-2 py-0.5 rounded bg-[#222] hover:bg-sky-500/20 hover:text-sky-400 text-[10px] text-[#fafafa] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskStatus(t.id, "in-progress");
                    }}
                  >
                    Start →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-[#121215] border border-[#222226] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-400 pb-2 border-b border-white/5">
            <span>In Progress ({inProgressTasks.length})</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a1a1e] text-sky-400">
              Active
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
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
                  <button
                    type="button"
                    className="px-1.5 py-0.5 rounded bg-[#222] hover:bg-[#333] text-[10px] text-[#a1a1aa]"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskStatus(t.id, "todo");
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px] font-medium hover:bg-sky-500/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskStatus(t.id, "review");
                    }}
                  >
                    Review →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Review */}
        <div className="bg-[#121215] border border-[#222226] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400 pb-2 border-b border-white/5">
            <span>In Review ({reviewTasks.length})</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a1a1e] text-amber-400">
              PR Open
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {reviewTasks.map((t) => (
              <div
                key={t.id}
                className="p-3 bg-[#18181c] hover:bg-[#1e1e24] border border-[#2a2a30] rounded-lg transition-all cursor-pointer"
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
                  <button
                    type="button"
                    className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-medium hover:bg-emerald-500/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskStatus(t.id, "done");
                    }}
                  >
                    Merge ✔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 4: Done */}
        <div className="bg-[#121215] border border-[#222226] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 pb-2 border-b border-white/5">
            <span>Completed ({doneTasks.length})</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a1a1e] text-emerald-400">
              Shipped
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {doneTasks.map((t) => (
              <div
                key={t.id}
                className="p-3 bg-[#18181c] opacity-80 border border-[#2a2a30] rounded-lg transition-all cursor-pointer"
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
                  <button
                    type="button"
                    className="px-2 py-0.5 rounded hover:bg-[#222] text-[10px] text-[#71717a] hover:text-[#fafafa]"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveTaskStatus(t.id, "in-progress");
                    }}
                  >
                    Reopen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedTask(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#0e0e11] border border-[#2a2a2e] rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded font-bold">
                  {selectedTask.id}
                </span>
                <span className="text-xs uppercase font-bold text-amber-400">
                  {selectedTask.priority} priority
                </span>
              </div>
              <button
                type="button"
                className="text-[#71717a] hover:text-[#fafafa] text-sm"
                onClick={() => setSelectedTask(null)}
              >
                ✕
              </button>
            </div>

            <h2 className="text-base font-bold text-[#fafafa] mb-4">
              {selectedTask.title}
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
              <div className="p-3 bg-[#141417] rounded-lg border border-[#222]">
                <div className="text-[#71717a] mb-0.5">Assignee</div>
                <div className="font-semibold text-[#fafafa]">{selectedTask.assignee}</div>
              </div>
              <div className="p-3 bg-[#141417] rounded-lg border border-[#222]">
                <div className="text-[#71717a] mb-0.5">Git Branch</div>
                <code className="text-sky-400 font-mono text-[11px]">{selectedTask.branch}</code>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg border border-[#333] text-xs text-[#fafafa]"
                onClick={() => setSelectedTask(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg bg-[#fafafa] text-black text-xs font-semibold"
                onClick={() => {
                  moveTaskStatus(selectedTask.id, "done");
                  setSelectedTask(null);
                }}
              >
                Mark as Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
