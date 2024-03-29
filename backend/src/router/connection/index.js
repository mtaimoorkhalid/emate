import { Router } from "express";
import ConnectionController from "../../controller/connection/index.js";
import AuthenticationMiddleware from "../../middleware/authorization.js";

const ConnectionRouter = Router();

ConnectionRouter.post(
  "/send-request/:mentorId",
  AuthenticationMiddleware,
  ConnectionController.sendRequest
);
ConnectionRouter.put(
  "/accept-request/:seekerId",
  AuthenticationMiddleware,
  ConnectionController.acceptRequest
);
ConnectionRouter.delete(
  "/delete-connection/:mentorId",
  AuthenticationMiddleware,
  ConnectionController.removeConnection
);
export default ConnectionRouter;
