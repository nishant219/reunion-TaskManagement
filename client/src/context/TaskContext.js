import React, { createContext, useState, useContext, useEffect } from 'react';
import { taskService } from '../services/taskService';
import { toast } from 'react-hot-toast';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([...tasks, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (error) {
      toast.error('Failed to create task');
      throw error;
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData);
      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (error) {
      toast.error('Failed to update task');
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;