import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { Edit2, Trash2 } from 'lucide-react';
import TaskForm from './TaskForm';
import { formatDistance } from 'date-fns';

const TaskItem = ({ task }) => {
  const { deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-green-200 text-green-900',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    };
    return colors[priority] || colors[3];
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task._id);
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <TaskForm 
              initialTask={task} 
              onClose={() => setIsEditing(false)} 
            />
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
              Priority {task.priority}
            </span>
            <span className={`text-sm font-medium ${task.status === 'finished' ? 'text-green-600' : 'text-yellow-600'}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
          
          <h3 className="text-lg font-bold mb-2 text-gray-800">{task.title}</h3>
          
          <div className="text-sm text-gray-600 mb-3">
            <div>Start: {new Date(task.startTime).toLocaleString()}</div>
            <div>End: {new Date(task.endTime).toLocaleString()}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {task.status === 'finished' 
                ? `Completed ${formatDistance(new Date(task.endTime), new Date(task.startTime))} ago`
                : `Estimated ${formatDistance(new Date(task.endTime), new Date())}`}
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit2 size={20} />
              </button>
              <button 
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;