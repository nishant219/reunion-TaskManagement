import Task from '../models/taskModel.js';

const calculateTaskStatistics = async (userId) => {
    const currentTime = new Date();
    const tasks = await Task.find({ user: userId });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(task => task.status === 'finished').length;
    const pendingTasks = totalTasks - completedTasks;

    const completionPercentage = totalTasks > 0
        ? ((completedTasks / totalTasks) * 100).toFixed(2)
        : 0;

    const pendingTasksByPriority = {
        1: { timeLapsed: 0, estimatedTimeLeft: 0 },
        2: { timeLapsed: 0, estimatedTimeLeft: 0 },
        3: { timeLapsed: 0, estimatedTimeLeft: 0 },
        4: { timeLapsed: 0, estimatedTimeLeft: 0 },
        5: { timeLapsed: 0, estimatedTimeLeft: 0 }
    };

    let totalCompletionTime = 0;
    let completedTasksCount = 0;

    tasks.forEach(task => {
        if (task.status === 'pending') {
            const timeLapsed = Math.max(0, (currentTime - task.startTime) / (1000 * 60 * 60));
            const estimatedTimeLeft = Math.max(0, (task.endTime - currentTime) / (1000 * 60 * 60));

            pendingTasksByPriority[task.priority].timeLapsed += timeLapsed;
            pendingTasksByPriority[task.priority].estimatedTimeLeft += estimatedTimeLeft;
        }

        if (task.status === 'finished') {
            const completionTime = (task.actualEndTime - task.startTime) / (1000 * 60 * 60);
            totalCompletionTime += completionTime;
            completedTasksCount++;
        }
    });

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionPercentage,
        pendingTasksByPriority
    };
};

export default calculateTaskStatistics;