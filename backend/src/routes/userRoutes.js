import express from "express";
import {
  loginUser,
  protectedRoute,
  registerUser,
 
} from "../controllers/userController.js";
import authenticateToken from "../middlewares/auth.js";
import { verifyEmailMiddleware } from "../middlewares/verify.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/protected", authenticateToken, protectedRoute);

userRouter.get('/verify-email',verifyEmailMiddleware);



export default userRouter;
