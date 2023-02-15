import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";
import { upload } from "../multer";
import { UserMiddleware } from "./middlewares/userMiddlewares";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);

export default authRoutes;
