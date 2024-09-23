import express from "express";
import dotenv from "dotenv";
dotenv.config({});
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.route.js";
import pinRoutes from "./routes/pin.route.js";
import cloudinary from "cloudinary";
import cors from "cors";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Deployment working");
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

// routes
app.use("/api/user", userRoutes);
app.use("/api/pin", pinRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Runnnig on PORT ${PORT} `);
});
