const express = require('express')
require ('dotenv').config()
const cors = require('cors');
const colors = require('colors')
const connectDB = require("./config/db_config")
const errorHandler = require('./middleware/errorHandler')


const app = express()
const PORT = process.env.PORT || 5000
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

// CORS setup
app.use(cors({
    // origin: 'https://your-frontend.vercel.app',
    origin: 'https://auto-fix-pro.vercel.app/',   
    credentials: true
  }));

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



// Error handler 

app.use(errorHandler);
app.listen(PORT, console.log(`SERVER IS RUNNING AT : ${PORT}` .bgBlue))