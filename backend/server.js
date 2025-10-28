import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();


connectDB();


app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://mern-student-teacher-frontend.onrender.com",
        "https://mern-student-teacher-app-1.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/exams", questionRoutes);


app.get("/", (req, res) => {
  res.send(" NRI MERN API is running...");
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
