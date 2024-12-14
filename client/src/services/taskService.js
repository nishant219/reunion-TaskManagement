import api from '../utils/api';

export const taskService = {
  async createTask(taskData) {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data.task;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Task creation failed');
    }
  },

  async getTasks() {
    try {
      const response = await api.get('/tasks');
      return response.data.tasks;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch tasks');
    }
  },

  async updateTask(taskId, taskData) {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data.task;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Task update failed');
    }
  },

  async deleteTask(taskId) {
    try {
      await api.delete(`/tasks/${taskId}`);
    } catch (error) {
      throw error.response ? error.response.data : new Error('Task deletion failed');
    }
  },

  async getTaskStatistics() {
    try {
      const response = await api.get('/tasks/stats');
      return response.data.stats;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Failed to fetch task statistics');
    }
  }
};