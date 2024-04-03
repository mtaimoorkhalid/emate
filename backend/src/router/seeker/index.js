import { Router } from "express";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import SeekerController from "../../controller/seeker/index.js";

const SeekerRouter = Router();
SeekerRouter.get(
  "/seeker-profile",
  AuthenticationMiddleware,
  SeekerController.showProfile
);

SeekerRouter.get(
  "/seeker-connections",
  AuthenticationMiddleware,
  SeekerController.showConnections
);
SeekerRouter.put(
  "/seeker-editProfile",
  AuthenticationMiddleware,
  SeekerController.editProfile
);
export default SeekerRouter;
