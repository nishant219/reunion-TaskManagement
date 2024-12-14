import React, { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import { toast } from 'react-hot-toast';
import TaskForm from '../components/tasks/TaskForm';

const StatCard = ({ title, value, description, className }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="text-3xl font-bold text-indigo-600 mb-2">{value}</div>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const fetchedStats = await taskService.getTaskStatistics();
        setStats(fetchedStats);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch task statistics');
        setIsLoading(false);
      }
    };

    fetchTaskStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Tasks" 
            value={stats.totalTasks} 
            description="Number of tasks created"
            className="bg-blue-50"
          />
          <StatCard 
            title="Completed Tasks" 
            value={`${stats.completedTasksPercentage}%`} 
            description="Percentage of completed tasks"
            className="bg-green-50"
          />
          <StatCard 
            title="Pending Tasks" 
            value={stats.pendingTasks} 
            description="Tasks that are still in progress"
            className="bg-yellow-50"
          />
          <StatCard 
            title="Avg Completion Time" 
            value={`${stats.averageCompletionTime} hrs`} 
            description="Average time to complete tasks"
            className="bg-purple-50"
          />
        </div>
      ) : (
        <p>No task statistics available</p>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Task Creation</h2>
        <TaskForm 
          onTaskCreated={() => {
            // Optionally refresh stats or show a message
            toast.success('Task created! Reload for updated stats.');
          }} 
        />
      </div>
    </div>
  );
};

export default DashboardPage;