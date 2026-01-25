import express from "express";

const app = express();

const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
    return(res.json({ status: "App is up and running..."  }));
});

app.listen(PORT, (req, res) => {
    console.log(`Exaple app running of port ${PORT}`)
});