import { Router } from "express";
import UserController from "../../controller/user/index.js";
import AuthenticationMiddleware from "../../middleware/authorization.js";

const UserRouter = Router();
UserRouter.get("/user-get", AuthenticationMiddleware, UserController.get);
UserRouter.put("/user-update", UserController.update);
UserRouter.delete("/user-delete", UserController.delete);
export default UserRouter;
