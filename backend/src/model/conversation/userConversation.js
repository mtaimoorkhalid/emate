// models/userConversation.js
import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import ConversationModel from "./index.js";
import UserModel from "../user/index.js";

const UserConversationModel = sequelize.define(
  "UserConversation",
  {},
  { timestamps: false }
);

export default UserConversationModel;
