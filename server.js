const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const routes = require('./route/routes');
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:4200"
}));

app.use(express.json());
app.use(routes);

app.listen(9992, function check(err) {
    if (err) {
        console.log("error");
    } else {
        console.log("Server started on port 9992");
    }
});

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/siteDeliver", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to DB");
    } catch (error) {
        console.log("Error connecting to DB:", error);
    }
}

connectDB();
