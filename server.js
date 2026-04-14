import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./src/config/db.js";
import router from "./src/routes/index.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config({ path: "/.env" });

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOPtions = {
  origin : "http://localhost:5173",
  credentials : true
} 
app.use(cors(corsOPtions));
app.use(morgan("dev"))

connectDB();

app.use("/api", router);


app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
