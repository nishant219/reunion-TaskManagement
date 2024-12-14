import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import logger from './utils/logger.js';
import connectDB from './config/dbConfig.js';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app=express();

const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'https://reunion-task-management.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
app.options("*", cors());
app.use(express.json()); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 'error',
      message: err.message || 'Something went wrong!'
    });
  });

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'error',
      message: `Can't find ${req.originalUrl} on this server!`
    });
  });

const startServer= async()=>{
    try{
        await connectDB();
        const PORT=process.env.PORT || 5000;
        app.listen(PORT,()=>{
            logger.info(`Server is running on port ${PORT}💥 `);
        });
    }catch(error){
        logger.error(`Error in startServer:`, error?.message);
        process.exit(1);
    }
}  

startServer();

export default app;