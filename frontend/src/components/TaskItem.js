import React from 'react';
import '../styles/TaskItem.css';

const TaskItem = ({
  task,
  editing,
  editData,
  onEdit,
  onSaveEdit,
  onDelete,
  onEditDataChange,
  user
}) => {
  const canEdit = user?.role === 'admin' || task.createdBy === user?.id;

  if (editing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={editData.title || ''}
          onChange={(e) => onEditDataChange({ ...editData, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={editData.description || ''}
          onChange={(e) => onEditDataChange({ ...editData, description: e.target.value })}
          placeholder="Description"
        ></textarea>
        <select
          value={editData.status || 'pending'}
          onChange={(e) => onEditDataChange({ ...editData, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => onSaveEdit(task.id)} className="save-btn">Save</button>
        <button onClick={() => onEdit(null)} className="cancel-btn">Cancel</button>
      </div>
    );
  }

  return (
    <div className="task-item">
      <div className="task-header">
        <h4>{task.title}</h4>
        <span className={`status ${task.status}`}>{task.status || 'pending'}</span>
      </div>
      <p>{task.description}</p>
      <small>Created by: {user.email || 'Unknown'}</small>
      {canEdit && (
        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
