import express from 'express';
import {PORT, mongoURL} from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import authRoute from './routes/authRoute.js';
import adminRoute from './routes/adminRoute.js';
import pickupRoute from './routes/pickupRoute.js';
import citizenRoute from './routes/citizenRoute.js';

const app = express();
//middleware for parsing request body
app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type'],
        credentials:true
    })
);

// Set up session middleware
app.use(
    session({
      secret: '123456', 
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true, // Ensures cookie is only accessible by the server
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        maxAge: 7200000, // 2 hour session expiration
      },
    })
);

mongoose.connect(mongoURL).then(()=>{
    console.log("Database is connected");
})
.catch((error) => {
    console.log(error);
})

app.get('/', (req, res)=>{
    return res.status(200).send("Welcome to Waste Management system app");
});

app.use('/auth', authRoute); 
app.use('/adminHome', adminRoute);
app.use('/pickupHome', pickupRoute);
app.use('/citizen', citizenRoute);

app.listen(PORT, ()=>{
    console.log(`App is listening to port : ${PORT}`);
});