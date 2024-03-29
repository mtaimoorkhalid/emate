// models/message.js
import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "../user/index.js";

const MessageModel = sequelize.define(
  "Message",
  {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

MessageModel.belongsTo(UserModel, { foreignKey: "senderId", as: "sender" });
MessageModel.belongsTo(UserModel, { foreignKey: "receiverId", as: "receiver" });

export default MessageModel;
