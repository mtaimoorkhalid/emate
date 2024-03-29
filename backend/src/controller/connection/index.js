import ConnectionModel from "../../model/connection/index.js";

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
      if (req.user.role !== "seeker") {
        return res
          .status(403)
          .json({ message: "Mentor cannot send connection request" });
      }
      const { mentorId } = req.params;
      const connection = await ConnectionModel.findOne({
        where: { seekerId: req.user.id, mentorId },
      });
      if (connection) {
        return res
          .status(403)
          .json({ message: "Connected or connection request already sent!" });
      }

      await ConnectionModel.create({
        status: "pending",
        mentorId,
        seekerId: req.user.id,
      });
      return res.json({ message: "Connection request successfully sent!!!" });
    } catch (error) {
      console.error("Error in sendRequest:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  acceptRequest: async (req, res) => {
    try {
      if (req.user.role !== "mentor") {
        return res
          .status(403)
          .json({ message: "Seeker cannot accept connection request" });
      }
      const { seekerId } = req.params;
      const connection = await ConnectionModel.findOne({
        where: { mentorId: req.user.id, seekerId },
      });
      if (!connection) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }
      connection.status = "accepted";
      await connection.save();
      return res.json({
        message: `Connection request accepted. You are now connected to user with ID: ${seekerId}`,
      });
    } catch (error) {
      console.error("Error in acceptRequest:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  removeConnection: async (req, res) => {
    try {
      const { mentorId } = req.params;
      const connection = await ConnectionModel.findOne({
        where: { mentorId, seekerId: req.user.id },
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
};

export default ConnectionController;
