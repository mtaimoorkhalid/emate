import ConversationModel from "../model/conversation/index.js";
import UserModel from "../model/user/index.js";

export const createConversation = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in createConversation controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const conversations = await user.getConversations();

    res.status(200).json(conversations);
  } catch (error) {
    console.log("Error in getConversations controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
