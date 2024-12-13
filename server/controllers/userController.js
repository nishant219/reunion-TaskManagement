import User from "../models/userModel.js";
import logger from "../utils/logger.js";

const registerUser = async(req, res)=>{
    try{
        const {name, email, password} = req?.body;
        if(!name || !email || !password){
            logger.error("Please provide all fields");
            res.status(400).json({message: "Please provide all fields"});
            return;
        }
        const userExists = await User.findByEmail(email);
        if(userExists){
            logger.error("User already exists");
            res.status(400).json({message: "User already exists"});
            return;
        }
        const newUser = await User.create({name, email, password});
        const token = await newUser.getSignedToken();

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name
            }
        });
        
    }catch(err){
        logger.error(err.message);
        res.status(500).json({message: "Server error while registering user"});
    }
}

const loginUser = async(req, res)=>{
    try{
        const {email, password} = req?.body;
        if(!email || !password){
            logger.error("Please provide all fields");
            return res.status(400).json({message: "Please provide all fields"});
        }

        const user = await User.findOne({ email }).select("+password");
        if(!user){
            logger.error("User not found");
            return res.status(404).json({message: "User not found"});
        }
        const isMatch = await user.isValidatedPassword(password);
        if(!isMatch){
            logger.error("Invalid credentials for user:", email);
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = await user.getSignedToken();
        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

    } catch (err){
        logger.error("Login error: ", err.message);
        return res.status(500).json({message: "Server error while logging in user"});
    }
};


const logoutUser = async(req, res)=>{
    try{
        // No need to do anything here as we are using JWT tokens
        // and we are not storing any tokens in the database
        // So, the user can simply delete the token from the client side
        res.status(200).json({message: "User logged out successfully"});
    }catch(err){
        logger.error(err.message);
        res.status(500).json({message: "Server error while logging out user"});
    }
}

const getUserProfile = async(req, res)=>{
    try{
        const user = req.user;
        logger.info("User profile fetched successfully");
        res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    }catch(err){
        logger.error(err.message);
        res.status(500).json({message: "Server error while fetching user profile"});
    }
}

const deleteUser = async(req, res)=>{
    try{
        const user = req.user;
        await user.remove();
        res.status(200).json({message: "User deleted successfully"});
    }catch(err){
        logger.error(err.message);
        res.status(500).json({message: "Server error while deleting user"});
    }
}

export {registerUser, loginUser, logoutUser, getUserProfile, deleteUser};