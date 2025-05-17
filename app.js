import express from 'express';
import { PORT } from './config/env.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subscription.route.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet.middlware.js';


const app = express();

// Middleware   
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(arcjetMiddleware)
 
// different routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);
app.get('/', (req, res)=>{
    res.send("Welcome to the subscription tracker APA");
});

app.listen(PORT, async ()=> {
    
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase()
});

export default app;