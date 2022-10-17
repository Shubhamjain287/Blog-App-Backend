const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const morgan = require("morgan")
const postRouter = require("./routers/post");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/post",postRouter);

const PORT =  process.env.PORT || 3100;

app.get("/", (req,res) => {
    res.send("Hello Shubham");
})

app.listen(PORT, ()=> {
    console.log(`Server is Running on PORT No ${PORT}`);
})