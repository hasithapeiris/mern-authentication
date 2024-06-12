import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Middleware for parsing incoming requests with json payloads
app.use(express.json());
// Allow sending form data
app.use(express.urlencoded({ extended: true }));

// Extract cookie data from HTTP requests
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
