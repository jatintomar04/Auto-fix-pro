const express = require('express')
require ('dotenv').config()
const colors = require('colors')
const connectDB = require("./config/db_config")
const errorHandler = require('./middleware/errorHandler')


const app = express()
const PORT = process.env.PORT || 5000
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/", (req,res)=> {
    res.json ({
        msg : "CAR CARE API IS RUNNING"
    });
});

// auth routes 
app.use("/api/auth", require("./routes/authRoutes"));

// car routes 

app.use("/api/car", require("./routes/carRoutes"))
// Admin routes 

app.use("/api/admin", require("./routes/adminRoutes"))

// cors

const cors = require("cors")

app.use(cors({allwOrigin : "*"}))


// Error handler 

app.use(errorHandler);
app.listen(PORT, console.log(`SERVER IS RUNNING AT : ${PORT}` .bgBlue))