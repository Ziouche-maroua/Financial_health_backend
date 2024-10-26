//import express frame to build server
//import dependencies
const express = require("express");
const { Pool } = require("pg"); // Import the Pool object from the 'pg' module

const cors = require("cors");
//create instance of express app
const app = express();
//config middleware
require("dotenv").config();
app.use(express.json());
// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
//define routes
const user = require("./routes/userRoutes");
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const profitRoutes = require('./routes/profitRoutes');
const reportRoutes =require( './routes/reportRoutes.js');


// Use routes
app.use("/api", user);
app.use('/api/expense', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/profit', profitRoutes);
app.use('/api', reportRoutes);


app.use(cors());

app.get("/", (req, res) => res.send("Home )"));

//starting the server
const PORT = process.env.PORT || 3001; // Use the PORT environment variable if set, otherwise default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
