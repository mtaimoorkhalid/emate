import { Router } from "express";
import AuthController from "../../controller/auth/index.js";
import AuthValidator from "../../validator/auth/index.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const AuthRouter = Router();
AuthRouter.post(
  "/register",
  upload.single("profilePicture"),
  AuthValidator.register,
  AuthController.register
);
AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/forgot-password", AuthController.forgotPassword);
AuthRouter.patch("/reset-password/:token", AuthController.resetPassword);
export default AuthRouter;
