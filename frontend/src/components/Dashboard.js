import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import '../styles/Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, [refreshKey]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data.tasks || []);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleTaskDeleted = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Management Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          {user?.role === 'admin' && <span className="admin-badge">Admin</span>}
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="left-panel">
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>

        <div className="right-panel">
          {error && <p className="error">{error}</p>}
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
