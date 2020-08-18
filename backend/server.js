import express from "express";
import { connectDB } from "./util/connectDB";
import config from "./config";
import productRoutes from "./routes/product-routes";
import userRoutes from "./routes/user-routes";

const PORT = process.env.PORT || 3300;
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
// Start DB
connectDB(config);
