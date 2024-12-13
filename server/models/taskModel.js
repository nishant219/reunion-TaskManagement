import mongoose from 'mongoose';
import logger from "../utils/logger.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A task must have a title'],
        trim: true,
        maxlength: [100, 'Task title cannot exceed 100 characters']
    },
    startTime: {
        type: Date,
        required: [true, 'A task must have a start time']
    },
    endTime: {
        type: Date,
        required: [true, 'A task must have an end time']
    },
    priority: {
        type: Number,
        required: [true, 'A task must have a priority'],
        min: [1, 'Priority must be between 1 and 5'],
        max: [5, 'Priority must be between 1 and 5']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'finished'],
            message: 'Status can only be pending or finished'
        },
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A task must belong to a user']
    },
    actualEndTime: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

taskSchema.pre('save', function (next) {
    if (this.endTime <= this.startTime) {
        const errorMessage = 'End time must be after start time';
        logger.error(errorMessage);
        return next(new Error(errorMessage));
    }
    logger.info(`Task saved with title: ${this.title}`);
    next();
});

taskSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.endTime && update.endTime <= update.startTime) {
        const errorMessage = 'End time must be after start time';
        logger.error(errorMessage);
        return next(new Error(errorMessage));
    }
    next();
});

const Task = mongoose.model('Task', taskSchema);
export default Task;