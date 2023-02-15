import { Router } from "express";
import { UserController } from "../controllers/userController";
import { upload } from "../multer";

const userRoutes = Router();

userRoutes.post("/", UserController.insert);
userRoutes.put("/:id" , upload.single('profilePicture') , UserController.update);
userRoutes.delete("/:id", UserController.delete);
userRoutes.get("/:id", UserController.findById);
userRoutes.get("/", UserController.findAll);

export default userRoutes;
