import ConnectionModel from "../../model/connection/index.js";
import UserModel from "../../model/user/index.js";

const ConnectionController = {
  sendRequest: async (req, res) => {
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    console.log(req.user.role);
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    try {
      // if (req.user.role !== "seeker") {
      //   return res
      //     .status(403)
      //     .json({ message: "Mentor cannot send connection request" });
      // }
      const { receiverId } = req.params;
      if (req.user.id === receiverId) {
        return res
          .status(403)
          .json({ message: "You cannot send request to yourself" });
      }

      const connection = await ConnectionModel.findOne({
        where: { senderId: req.user.id, receiverId },
      });
      if (connection) {
        return res
          .status(403)
          .json({ message: "Connected or connection request already sent!" });
      }

      await ConnectionModel.create({
        status: "pending",
        receiverId,
        senderId: req.user.id,
      });
      return res.json({ message: "Connection request successfully sent!!!" });
    } catch (error) {
      console.error("Error in sendRequest:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  acceptRequest: async (req, res) => {
    try {
      // if (req.user.role !== "mentor") {
      //   return res
      //     .status(403)
      //     .json({ message: "Seeker cannot accept connection request" });
      // }
      const { senderId } = req.params;
      const connection = await ConnectionModel.findOne({
        where: { receiverId: req.user.id, senderId },
      });
      if (!connection) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connection.status = "accepted";
      await connection.save();
      return res.json({
        message: `Connection request accepted. You are now connected to user with ID: ${senderId}`,
      });
    } catch (error) {
      console.error("Error in acceptRequest:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  removeConnection: async (req, res) => {
    try {
      const { receiverId } = req.params;
      const connection = await ConnectionModel.findOne({
        where: { receiverId, senderId: req.user.id },
      });
      if (!connection) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      await connection.destroy();
      return res.json({ message: "Connection removed!!!" });
    } catch (error) {
      console.error("Error in acceptRequest:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  showConnectionRequests: async (req, res) => {
    try {
      const connectionRequests = await ConnectionModel.findAll({
        where: { receiverId: req.user.id, status: "pending" },
        include: [
          {
            model: UserModel,
            as: "sender",
            attributes: ["name"],
          },
        ],
      });
      if (!connectionRequests) {
        return res.status(404).json({ message: "No Connection Request found" });
      }
      return res.json({ connectionRequests });
    } catch (error) {
      console.error("Error in acceptRequest:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};

export default ConnectionController;
