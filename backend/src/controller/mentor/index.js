import ConnectionModel from "../../model/connection/index.js";
import MentorModel from "../../model/mentor/index.js";
import UserModel from "../../model/user/index.js";
import { Op } from "sequelize";

const MentorController = {
  showProfile: async (req, res) => {
    try {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(req.user.id);
      const data = await UserModel.findOne({
        where: { id: req.user.id },
        attributes: [
          "name",
          "email",
          "phone",
          "address",
          "profilePicture",
          "about",
        ],
        include: [
          {
            model: MentorModel,
            attributes: ["expertise"],
          },
        ],
        // this raw line makes the whole nested object a single object
        //raw: true,
      });
      // console.log(data);
      if (!data) {
        return res.status(404).json({
          message:
            "User Not Found or token has been expired!!!!!!!!!!!!!!!!!!!!!!!!!",
        });
      }
      return res.json({ data });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  showConnections: async (req, res) => {
    try {
      const mentorConnections = await ConnectionModel.findAll({
        where: {
          [Op.or]: [{ senderId: req.user.id }, { receiverId: req.user.id }],
          status: "accepted",
        },
        include: [
          {
            model: UserModel,
            as: "sender",
            attributes: [
              "name",
              "email",
              "phone",
              "address",
              "profilePicture",
              "role",
            ],
          },
          {
            model: UserModel,
            as: "receiver",
            attributes: ["name", "email", "phone", "address", "profilePicture"],
          },
        ],
      });

      const connectionDetails = mentorConnections.map((connection) => {
        const otherUser =
          connection.senderId === req.user.id
            ? connection.receiver
            : connection.sender;
        return {
          id: connection.id,
          status: connection.status,
          otherUser: {
            id: otherUser.id,
            name: otherUser.name,
            email: otherUser.email,
            phone: otherUser.phone,
            address: otherUser.address,
            profilePicture: otherUser.profilePicture,
          },
        };
      });

      return res.json({
        message: "Mentor's Connections",
        connections: connectionDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { name, address, phone, profilePicture, about, expertise } =
        req.body;
      const user = await UserModel.findOne({ where: { id: req.user.id } });
      const userInfo = await MentorModel.findOne({
        where: { UserId: req.user.id },
      });
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(userInfo);
      if (!user) {
        return res.status(404).json({
          message: "User Issue!!!!!!!!!!!!!!!!!!!!!!!!!",
        });
      }
      if (!userInfo) {
        return res.status(404).json({
          message: "User Info issue!!!!!!!!!!!!!!!!!!!!!!!!!",
        });
      }

      if (name) user.name = name;
      if (address) user.address = address;
      if (phone) user.phone = phone;
      if (profilePicture) user.profilePicture = profilePicture;
      if (about) user.about = about;
      if (expertise) userInfo.expertise = expertise;
      await user.save();
      await userInfo.save();
      res.json({
        message: "Profile got Updated",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
};
export default MentorController;
