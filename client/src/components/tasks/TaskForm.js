import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { toast } from 'react-hot-toast';

const TaskForm = ({ initialTask = null, onClose }) => {
  const { createTask, updateTask } = useTask();
  const [title, setTitle] = useState(initialTask?.title || '');
  const [startTime, setStartTime] = useState(
    initialTask?.startTime ? new Date(initialTask.startTime).toISOString().slice(0, 16) : 
    new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(
    initialTask?.endTime ? new Date(initialTask.endTime).toISOString().slice(0, 16) : 
    ''
  );
  const [priority, setPriority] = useState(initialTask?.priority || 3);
  const [status, setStatus] = useState(initialTask?.status || 'pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validations
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (new Date(startTime) > new Date(endTime)) {
      toast.error('End time must be after start time');
      return;
    }

    try {
      const taskData = {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        priority: Number(priority),
        status
      };

      if (initialTask) {
        await updateTask(initialTask._id, taskData);
      } else {
        await createTask(taskData);
      }

      onClose && onClose();
    } catch (error) {
      console.error('Task submission error', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {initialTask ? 'Edit Task' : 'Create New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            <option value="pending">Pending</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {initialTask ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;