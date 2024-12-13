import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask, getTaskStatistics } from '../controllers/taskController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/stats", auth, getTaskStatistics);
router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);


export default router;
