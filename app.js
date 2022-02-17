require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const app = express()
const cors = require("cors")
const userRouter = require("./api/users/user.router")


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/users", userRouter)




app.listen(process.env.APP, () => console.log(`Listen on port ${process.env.APP}`));