import SeekerModel from "../../model/seeker/index.js";
import UserModel from "../../model/user/index.js";
import ConnectionModel from "../../model/connection/index.js";

const SeekerController = {
  showProfile: async (req, res) => {
    try {
      const data = await SeekerModel.findOne({
        where: { UserId: req.user.id },
        include: [UserModel],
      });
      console.log(data);
      if (!data) {
        return res.json({ message: "User Not Found or token expired" });
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
        where: { seekerId: req.user.id, status: "accepted" },
        include: [
          { model: UserModel, as: "seeker" },
          { model: UserModel, as: "mentor" },
        ],
      });
      return res.json({ message: "Got All Connections!!", connections });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  showConnections: async (req, res) => {
    try {
      const seekerConnections = await ConnectionModel.findAll({
        where: { seekerId: req.user.id, status: "accepted" },
        include: [
          {
            model: UserModel,
            as: "mentor",
            attributes: ["name", "email", "phone", "address"],
          },
        ],
      });
      const mentorDetails = seekerConnections.map((connection) => {
        return connection.mentor;
      });

      return res.json({
        message: "Seeker's Connections",
        connections: mentorDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
};
export default SeekerController;
