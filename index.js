import express from "express";

import userRouter from './routes/user.routes.js';

import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(authenticationMiddleware);

const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
    return(res.json({ status: "App is up and running..."  }));
});

app.use('/user', userRouter);

app.listen(PORT, (req, res) => {
    console.log(`Exaple app running of port ${PORT}`)
});