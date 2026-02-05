import React, { useState } from 'react';
import { taskService } from '../services/api';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onTaskDeleted, user }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditData(task);
  };

  const handleSaveEdit = async (taskId) => {
    try {
      await taskService.updateTask(
        taskId,
        editData.title,
        editData.description,
        editData.status
      );
      setEditingId(null);
      onTaskDeleted(); // Refresh list
    } catch (err) {
      alert('Failed to update task: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(taskId);
        onTaskDeleted();
      } catch (err) {
        alert('Failed to delete task: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks yet. Create one to get started!</p>;
  }

  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editing={editingId === task.id}
          editData={editData}
          onEdit={handleEdit}
          onSaveEdit={handleSaveEdit}
          onDelete={handleDelete}
          onEditDataChange={setEditData}
          user={user}
        />
      ))}
    </div>
  );
};

export default TaskList;
