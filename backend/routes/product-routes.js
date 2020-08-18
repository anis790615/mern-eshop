import express from "express";
import {
  retrieveProducts,
  retrieveProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controllers";
import { isAuthenticated, isAdmin } from "../util/tokenAuthentication";

const productRoutes = express.Router();

productRoutes.get("/", retrieveProducts);
productRoutes.post("/", isAuthenticated, isAdmin, createProduct);
productRoutes.get("/:id", retrieveProduct);
productRoutes.put("/:id", isAuthenticated, isAdmin, updateProduct);
productRoutes.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

export default productRoutes;
