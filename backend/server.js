// ilk once (npm i express) install edirik ondan sonra express kitabxanasindan istifade edirik
// const express = require("express")
// serveri auto yeniliyir herdefe manual yenilemek lazim olmur bunun ucun cmd kodu package.json scripts-icerisinde adini istediyini kimi yaza bileriniz ama yolunu dogru gosterin yolunu gosterdiyiniz companent auto refres olur ( npm i -D nodemon concurrently )
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import { errorHandle, notFound } from "./middleware/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRouter from "./routes/productRouters.js";
import userRouter from "./routes/userRouters.js";
import uploadRouter from "./routes/uploadRoutes.js";
dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const imagePath = path.join(__dirname, "./uploads");
// // this is required for images display in site otherwise image not available
// app.use("/uploads", express.static(imagePath));
// app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);



app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "products") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}else{
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
