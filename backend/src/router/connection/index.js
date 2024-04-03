import { Router } from "express";
import ConnectionController from "../../controller/connection/index.js";
import AuthenticationMiddleware from "../../middleware/authorization.js";

const ConnectionRouter = Router();

ConnectionRouter.post(
  "/send-request/:receiverId",
  AuthenticationMiddleware,
  ConnectionController.sendRequest
);
ConnectionRouter.put(
  "/accept-request/:senderId",
  AuthenticationMiddleware,
  ConnectionController.acceptRequest
);
ConnectionRouter.delete(
  "/delete-connection/:mentorId",
  AuthenticationMiddleware,
  ConnectionController.removeConnection
);
ConnectionRouter.get(
  "/get-connectionRequests",
  AuthenticationMiddleware,
  ConnectionController.showConnectionRequests
);
export default ConnectionRouter;
