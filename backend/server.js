import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";
import productsRoutes from "./routes/productsRoutes.js";
import { Product } from "./models/productSchema.js";

import 'dotenv/config'
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); //parsing request body
app.use(cors()); // Use the cors middleware

// welcome Route
app.get("/", async (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to products website");
});

// initialize the database with seed data
app.get("/api/initialize", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    await Product.insertMany(products);

    res.status(200).json({ message: "Database initialized with seed data" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while initializing the database" });
  }
});
//routes
app.use("/api/products", productsRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
