import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { taskService } from '../../services/taskService';

const TaskForm = ({ onTaskCreated, initialTask = null }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [startTime, setStartTime] = useState(
    initialTask?.startTime 
      ? new Date(initialTask.startTime).toISOString().slice(0, 16) 
      : new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(
    initialTask?.endTime 
      ? new Date(initialTask.endTime).toISOString().slice(0, 16) 
      : ''
  );
  const [priority, setPriority] = useState(initialTask?.priority || 3);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    const taskData = {
      title,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      priority: Number(priority)
    };

    try {
      const task = initialTask 
        ? await taskService.updateTask(initialTask._id, taskData)
        : await taskService.createTask(taskData);
      
      toast.success(initialTask ? 'Task updated successfully' : 'Task created successfully');
      onTaskCreated(task);
      
      // Reset form
      setTitle('');
      setStartTime(new Date().toISOString().slice(0, 16));
      setEndTime('');
      setPriority(3);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="startTime" className="block text-gray-700 font-bold mb-2">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endTime" className="block text-gray-700 font-bold mb-2">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="priority" className="block text-gray-700 font-bold mb-2">
          Priority (1-5)
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
      >
        {initialTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;