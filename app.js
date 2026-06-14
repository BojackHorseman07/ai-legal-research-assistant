require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.log(err);
});

app.use('/', authRoutes);

app.use('/', uploadRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

