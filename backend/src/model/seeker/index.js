import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "../user/index.js";

const SeekerModel = sequelize.define(
  "Seeker",
  {
    education: { type: DataTypes.STRING },
  },
  { timestamps: false }
);
SeekerModel.belongsTo(UserModel);
UserModel.hasOne(SeekerModel);
export default SeekerModel;
