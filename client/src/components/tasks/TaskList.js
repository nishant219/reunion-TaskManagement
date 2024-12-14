import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { PlusIcon, FilterIcon } from 'lucide-react';

const TaskList = () => {
  const { tasks, loading } = useTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    priority: '',
    status: ''
  });

  const filteredTasks = tasks.filter(task => {
    const priorityMatch = !filter.priority || task.priority === Number(filter.priority);
    const statusMatch = !filter.status || task.status === filter.status;
    return priorityMatch && statusMatch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          >
            <PlusIcon className="mr-2" size={20} /> Add Task
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <select 
          value={filter.priority} 
          onChange={(e) => setFilter({...filter, priority: e.target.value})}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Priorities</option>
          {[1,2,3,4,5].map(p => (
            <option key={p} value={p}>Priority {p}</option>
          ))}
        </select>
        <select 
          value={filter.status} 
          onChange={(e) => setFilter({...filter, status: e.target.value})}
          className="border rounded-md px-3 py-2"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500">
          No tasks found. Create a new task!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <TaskForm 
              onClose={() => setIsModalOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;