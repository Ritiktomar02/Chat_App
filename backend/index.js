const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database.js");
const userRoute = require("./routes/userRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./socket/socket.js");

const path = require("path");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Use the existing __dirname
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});


app.get("/", (req, res) => {
    res.send("Server is running");
});

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});
