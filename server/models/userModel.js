import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import logger from "../utils/logger.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false
    },
    name: {
        type: String,
        required: [true, 'Please provide a name']
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        logger.info(`Hashing password for user: ${this.email}`);
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (error) {
        logger.error(`Error hashing password for user ${this.email}:`, error.message);
        return next(error);
    }
});

userSchema.methods.isValidatedPassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        if (!isMatch) {
            logger.error(`Password mismatch for user ${this.email}`);
        }
        return isMatch;
    } catch (error) {
        logger.error(`Error comparing password for user ${this.email}:`, error.message);
        throw new Error('Password comparison failed');
    }
};


userSchema.methods.getSignedToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    logger.info(`JWT token generated for user ${this.email}`);
    return token;
};

userSchema.statics.findByEmail = async function (email) {
    try {
        return await this.findOne({ email });
    } catch (error) {
        logger.error(`Error fetching user with email ${email}:`, error.message);
        throw new Error('Error fetching user by email');
    }
};

const User = mongoose.model('User', userSchema);
export default User;
