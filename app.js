require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const authenticate = require('./middlewares/authenticate')
const userRoute = require("./routes/user-route")
const studentRoute = require("./routes/student-route")

const app = express();

app.use(cors());
app.use(express.json());

// service
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use("/student", studentRoute);

// notFound
app.use(notFound);

//Error
app.use(errorMiddleware);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on Port:", port));
