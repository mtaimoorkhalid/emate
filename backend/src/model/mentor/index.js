import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import UserModel from "../user/index.js";

const MentorModel = sequelize.define(
  "Mentor",
  {
    expertise: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
MentorModel.belongsTo(UserModel);
UserModel.hasOne(MentorModel);
export default MentorModel;
