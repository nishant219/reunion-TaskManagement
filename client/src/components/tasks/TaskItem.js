import React from 'react';
import { formatDistance } from 'date-fns';

const TaskItem = ({ task, onDelete, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-green-200 text-green-900';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <span 
            className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}
          >
            Priority: {task.priority}
          </span>
          <span className="text-sm text-gray-500">
            {formatDistance(new Date(task.startTime), new Date(), { addSuffix: true })}
          </span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;