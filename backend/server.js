const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "1.1.1.1"
]);


const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes');

const adminRoutes = require('./routes/adminRoutes');




const app=express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://YOUR-FRONTEND.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
connectDB();

app.use('/api/auth', authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});