import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "../user/index.js";

const ConnectionModel = sequelize.define(
  "Connection",
  {
    status: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

// ConnectionModel.belongsTo(UserModel, { as: "sender", foreignKey: "senderId" });
// ConnectionModel.belongsTo(UserModel, {
//   as: "receiver",
//   foreignKey: "receiverId",
// });

// UserModel.belongsToMany(UserModel, {
//   through: ConnectionModel,
//   as: "connections",
//   foreignKey: "senderId",
// });
// UserModel.belongsToMany(UserModel, {
//   through: ConnectionModel,
//   as: "receivedConnections",
//   foreignKey: "receiverId",
// });
UserModel.belongsToMany(UserModel, {
  through: ConnectionModel,
  as: "senderConnections",
  foreignKey: "senderId",
});
UserModel.belongsToMany(UserModel, {
  through: ConnectionModel,
  as: "receiverConnections",
  foreignKey: "receiverId",
});

ConnectionModel.belongsTo(UserModel, { as: "sender" });
ConnectionModel.belongsTo(UserModel, { as: "receiver" });

export default ConnectionModel;
