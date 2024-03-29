// models/conversation.js
import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "../user/index.js";
import UserConversationModel from "./userConversation.js";
import MessageModel from "../message/index.js";

const ConversationModel = sequelize.define(
  "Conversation",
  {},
  { timestamps: false }
);

ConversationModel.belongsToMany(UserModel, {
  through: UserConversationModel,
  as: "participants",
});
UserModel.belongsToMany(ConversationModel, {
  through: UserConversationModel,
  as: "conversations",
});
ConversationModel.hasMany(MessageModel, {
  foreignKey: "ConversationId",
  as: "messages",
});

export default ConversationModel;
