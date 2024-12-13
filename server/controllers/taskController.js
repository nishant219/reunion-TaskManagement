import Task from '../models/taskModel.js';
import logger from '../utils/logger.js';
import calculateTaskStatistics from "../utils/calculateStats.js";

const createTask = async (req, res) => {
    try {
        const { title, startTime, endTime, priority } = req?.body;
        if (!title || !startTime || !endTime || priority === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (endTime <= startTime) {
            logger.error('End time must be after start time');
            return res.status(400).json({ error: 'End time must be after start time' });
        }
        const newTask = new Task({
            title,
            startTime,
            endTime,
            priority,
            user: req.user._id
        });
        await newTask.save();
        logger.info(`Task created successfully: ${newTask.title}`);
        return res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });
    } catch (error) {
        logger.error('Error creating task:', error.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};


const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found for the user' });
        }
        logger.info(`Fetched ${tasks.length} tasks for user: ${req.user.email}`);
        return res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks
        });
    } catch (error) {
        logger.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        logger.info(`Fetched task: ${task.title}`);

        return res.status(200).json({
            message: 'Task retrieved successfully',
            task
        });
    } catch (error) {
        logger.error('Error fetching task:', error.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, startTime, endTime, priority, status } = req.body;
        if (endTime && endTime <= startTime) {
            return res.status(400).json({ error: 'End time must be after start time' });
        }
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, startTime, endTime, priority, status },
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        logger.info(`Updated task: ${task.title}`);
        return res.status(200).json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        logger.error('Error updating task:', error.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        logger.info(`Deleted task: ${task.title}`);

        return res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting task:', error.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};

const getTaskStatistics = async (req, res) => {
    try {
        const stats = await calculateTaskStatistics(req.user._id);
        logger.info('Fetched task statistics');
        return res.status(200).json({
            message: 'Task statistics retrieved successfully',
            stats
        });
    } catch (error) {
        logger.error('Error fetching task statistics:', error.message);
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};

export { createTask, getTasks, getTaskById, updateTask, deleteTask, getTaskStatistics };
