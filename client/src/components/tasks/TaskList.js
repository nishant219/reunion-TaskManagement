import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import { toast } from 'react-hot-toast';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      setIsLoading(false);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <TaskForm 
            onTaskCreated={handleTaskCreated}
            initialTask={editingTask}
            onTaskUpdated={handleTaskUpdate}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found. Create your first task!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onDelete={handleTaskDelete}
                  onEdit={setEditingTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;