import ConnectionModel from "../../model/connection/index.js";
import MentorModel from "../../model/mentor/index.js";
import UserModel from "../../model/user/index.js";

const MentorController = {
  showProfile: async (req, res) => {
    try {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(req.user.id);
      const data = await MentorModel.findOne({
        where: { UserId: req.user.id },
        include: [
          {
            model: UserModel,
            attributes: [
              "name",
              "email",
              "role",
              "phone",
              "address",
              "profilePicture",
            ],
          },
        ],
        // this raw line makes the whole nested object a single object
        //raw: true,
      });
      console.log(data);
      if (!data) {
        return res.json({
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
  showConnection: async (req, res) => {
    try {
      const connections = await ConnectionModel.findAll({
        where: { mentorId: req.user.id, status: "accepted" },
        include: [
          {
            model: UserModel,
            as: "seeker",
            attributes: ["name", "email", "role", "phone", "address"],
          },
          {
            model: UserModel,
            as: "mentor",
            attributes: ["name", "email", "role", "phone", "address"],
          },
        ],
        raw: true,
      });
      return res.json({ message: "Got All Connections!!", connections });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  showConnections: async (req, res) => {
    try {
      const mentorConnections = await ConnectionModel.findAll({
        where: { mentorId: req.user.id, status: "accepted" },
        include: [
          {
            model: UserModel,
            as: "seeker",
            attributes: ["name", "email", "phone", "address"],
          },
        ],
      });
      const seekerDetails = mentorConnections.map((connection) => {
        return connection.seeker;
      });

      return res.json({
        message: "Mentor's Connections",
        connections: seekerDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
};
export default MentorController;
