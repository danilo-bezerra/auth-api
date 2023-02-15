import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);

export default routes;
