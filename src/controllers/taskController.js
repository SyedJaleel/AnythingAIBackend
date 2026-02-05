const Task = require('../models/Task');
const User = require('../models/User');

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user.id;

    const taskId = await Task.create(title, description, createdBy);

    res.status(201).json({
      message: 'Task created successfully',
      task: { id: taskId, title, description, createdBy }
    });
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    // Admin can see all tasks, regular users see only their own
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.getAll();
    } else {
      tasks = await Task.getAllByUser(req.user.id);
    }

    res.status(200).json({
      message: 'Tasks fetched successfully',
      tasks
    });
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check authorization: user can only view their own task, admin can view all
    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Access Denied: You can only view your own tasks' });
    }

    res.status(200).json({
      message: 'Task fetched successfully',
      task
    });
  } catch (err) {
    console.error('Get task error:', err);
    res.status(500).json({ message: 'Failed to fetch task', error: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check authorization: user can only update their own task, admin can update all
    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Access Denied: You can only update your own tasks' });
    }

    const changes = await Task.update(id, title, description, status);
    if (changes === 0) {
      return res.status(400).json({ message: 'Failed to update task' });
    }

    res.status(200).json({
      message: 'Task updated successfully',
      task: { id, title, description, status }
    });
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check authorization: user can only delete their own task, admin can delete all
    if (req.user.role !== 'admin' && task.createdBy !== req.user.id) {
      return res.status(403).json({ message: 'Access Denied: You can only delete your own tasks' });
    }

    const changes = await Task.delete(id);
    if (changes === 0) {
      return res.status(400).json({ message: 'Failed to delete task' });
    }

    res.status(200).json({
      message: 'Task deleted successfully'
    });
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
