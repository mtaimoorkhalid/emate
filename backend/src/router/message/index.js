import express from "express";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import MessageController from "../../controller/message/index.js";

const MessageRouter = express.Router();

MessageRouter.post(
  "/send/:id",
  AuthenticationMiddleware,
  MessageController.sendMessage
);
MessageRouter.get(
  "/:id",
  AuthenticationMiddleware,
  MessageController.getMessage
);

export default MessageRouter;
