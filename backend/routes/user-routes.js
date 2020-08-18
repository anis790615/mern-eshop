import express from "express";
import {
  createAdmin,
  userSignin,
  userRegister,
} from "../controllers/user-controllers";

const userRoutes = express.Router();

userRoutes.get("/createadmin", createAdmin);
userRoutes.post("/signin", userSignin);
userRoutes.post("/register", userRegister);

export default userRoutes;
