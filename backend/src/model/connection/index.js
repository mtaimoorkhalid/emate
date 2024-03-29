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

ConnectionModel.belongsTo(UserModel, { as: "seeker" });
ConnectionModel.belongsTo(UserModel, { as: "mentor" });

UserModel.hasMany(ConnectionModel, {
  as: "connections",
  foreignKey: "seekerId",
});
UserModel.hasMany(ConnectionModel, {
  as: "receivedConnections",
  foreignKey: "mentorId",
});
export default ConnectionModel;
