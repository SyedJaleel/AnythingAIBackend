const express = require('express');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { validate, taskSchema } = require('../utils/validation');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/', verifyToken, validate(taskSchema), createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.get('/', verifyToken, getAllTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a specific task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 */
router.get('/:id', verifyToken, getTaskById);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put('/:id', verifyToken, validate(taskSchema), updateTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
