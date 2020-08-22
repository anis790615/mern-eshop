import express from "express";
import { isAuthenticated } from "../util/tokenAuthentication";
import { retrieveClient } from "../controllers/payment-controllers";

const paymentRoutes = express.Router();

paymentRoutes.get("/", retrieveClient);
export default paymentRoutes;
