import { Router } from "express";
import { UserController } from "../controllers/userController";
import { upload } from "../multer";
import { UserMiddleware } from "./middlewares/userMiddlewares";

const userRoutes = Router();

userRoutes.post("/", UserMiddleware.emailAvailable, UserController.insert);
userRoutes.put(
  "/:id",
  UserMiddleware.emailAvailable,
  upload.single("profilePicture"),
  UserController.update
);
userRoutes.delete("/:id", UserController.delete);
userRoutes.get("/:id", UserController.findById);
userRoutes.get("/", UserController.findAll);

export default userRoutes;
