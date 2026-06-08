import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://127.0.0.1:5000";

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const [projectName, setProjectName] = useState("");
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [deadline, setDeadline] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchData = async () => {
    try {
      const projectsRes = await axios.get(`${API}/projects`);
      const tasksRes = await axios.get(`${API}/tasks`);

      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Cannot connect to backend server.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createProject = async () => {
    if (!projectName.trim()) return;

    try {
      await axios.post(`${API}/projects`, {
        name: projectName,
      });

      setProjectName("");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(`${API}/tasks`, {
        title,
        assignedTo,
        deadline,
      });

      setTitle("");
      setAssignedTo("");
      setDeadline("");

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/tasks/${id}`, {
        status,
      });

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/tasks/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const activeTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const progress =
    tasks.length > 0
      ? (completedTasks / tasks.length) * 100
      : 0;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <div className="hero">
        <h1>🚀 Project Management Dashboard</h1>

        <p>
          Organize projects, assign tasks, monitor deadlines
          and track team productivity in real-time.
        </p>
      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div className="dashboard">
        <div className="stat-card">
          <div className="number">{projects.length}</div>
          <p>Total Projects</p>
        </div>

        <div className="stat-card">
          <div className="number">{tasks.length}</div>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <div className="number">{completedTasks}</div>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <div className="number">{activeTasks}</div>
          <p>Active Tasks</p>
        </div>
      </div>

      <div className="card">
        <h2>📊 Project Progress</h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2>{progress.toFixed(0)}%</h2>
        <p>Project Completion Rate</p>
      </div>

      <div className="form-grid">
        <div className="card">
          <h2>📁 Create Project</h2>

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button onClick={createProject}>
            Add Project
          </button>
        </div>

        <div className="card">
          <h2>✅ Create Task</h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <button onClick={createTask}>
            Add Task
          </button>
        </div>
      </div>

      <div className="main-grid">
        <div className="card">
          <h2>📂 Projects</h2>

          <div className="project-grid">
            {projects.map((project) => (
              <div
                className="project-card"
                key={project._id}
              >
                <h3>📁 {project.name}</h3>
                <p>Active Project</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>📋 Task Management</h2>

          <div className="filter-row">
            <input
              type="text"
              placeholder="Search Tasks..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {filteredTasks.map((task) => (
            <div
              className={`task ${
                task.status === "Completed"
                  ? "task-completed"
                  : task.status === "In Progress"
                  ? "task-progress"
                  : "task-pending"
              }`}
              key={task._id}
            >
              <div className="task-header">
                <h3>{task.title}</h3>

                <span
                  className={
                    task.status === "Completed"
                      ? "completed"
                      : task.status === "In Progress"
                      ? "inprogress"
                      : "pending"
                  }
                >
                  {task.status}
                </span>
              </div>

              <p>👤 {task.assignedTo}</p>
              <p>📅 {task.deadline}</p>

              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(
                    task._id,
                    e.target.value
                  )
                }
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;