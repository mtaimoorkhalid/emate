import { Router } from "express";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import MentorController from "../../controller/mentor/index.js";

const MentorRouter = Router();
MentorRouter.get(
  "/mentor-profile",
  AuthenticationMiddleware,
  MentorController.showProfile
);
MentorRouter.get(
  "/mentor-connections",
  AuthenticationMiddleware,
  MentorController.showConnections
);
export default MentorRouter;
