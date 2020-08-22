import express from "express";
import { isAuthenticated } from "../util/tokenAuthentication";
import {
  createOrder,
  retrieveOrder,
  completeOrder,
} from "../controllers/order-controllers";

const orderRoutes = express.Router();

orderRoutes.post("/", isAuthenticated, createOrder);
orderRoutes.put("/:id/pay", isAuthenticated, completeOrder);
orderRoutes.get("/:id", isAuthenticated, retrieveOrder);
export default orderRoutes;
