import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
const UserModel = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING() },
    password: { type: DataTypes.STRING() },
    role: { type: DataTypes.STRING() },
    phone: { type: DataTypes.STRING() },
    address: { type: DataTypes.STRING() },
    profilePicture: { type: DataTypes.STRING() },
  },
  { timestamps: false }
);
export default UserModel;
