import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routers/userRouter.js"; 
import adminRoutes from './routers/adminRouter.js'
 import cors from 'cors'
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors())


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));


app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
