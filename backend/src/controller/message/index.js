// controllers/message.controller.js
import MessageModel from "../../model/message/index.js";
import ConversationModel from "../../model/conversation/index.js";
import { getReceiverSocketId, io } from "../../socket/index.js";
import MentorController from "../mentor/index.js";
import UserModel from "../../model/user/index.js";
const MessageController = {
  sendMessage: async (req, res) => {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user.id;

      let conversation = await ConversationModel.findOne({
        include: [
          {
            model: UserModel,
            as: "participants",
            where: { id: [senderId, receiverId] },
          },
        ],
      });

      if (!conversation) {
        conversation = await ConversationModel.create({});
        await conversation.addParticipants([senderId, receiverId]);
      }

      const newMessage = await MessageModel.create({
        senderId,
        receiverId,
        message,
        ConversationId: conversation.id,
      });

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getMessage: async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user.id; // Adjust this according to your authentication logic

      // Find conversation between sender and userToChatId
      const conversation = await ConversationModel.findOne({
        include: [
          {
            model: UserModel,
            as: "participants",
            where: { id: [senderId, userToChatId] },
          },
          { model: MessageModel, as: "messages" },
        ],
      });

      if (!conversation) {
        // No conversation found, return empty array
        return res.status(200).json([]);
      }

      // Conversation found, retrieve messages
      const messages = conversation.messages;

      // Return messages
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default MessageController;
