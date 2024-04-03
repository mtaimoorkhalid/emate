import SeekerModel from "../../model/seeker/index.js";
import MentorModel from "../../model/mentor/index.js";

const AdditionalInfoController = {
  addInfo: async (req, res) => {
    try {
      const data = req.body;
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
      console.log(req.user.role);
      console.log(req.user.id);
      console.log(
        "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
      );
      if (req.user.role === "seeker") {
        const seekerForm = await SeekerModel.findOne({
          where: { UserId: req.user.id },
        });
        if (seekerForm) {
          return res.status(403).json({
            message: "Info Already Submitted go for edit if you want to!",
          });
        }
        await SeekerModel.create({
          education: data.education,
          UserId: req.user.id,
        });
        return res.json({ message: "Seeker Info Submitted Sucessfully!!" });
      } else if (req.user.role === "mentor") {
        const mentorForm = await MentorModel.findOne({
          where: { UserId: req.user.id },
        });
        if (mentorForm) {
          return res.status(403).json({
            message: "Info Already Submitted go for edit if you want to!",
          });
        }
        await MentorModel.create({
          UserId: req.user.id,
          expertise: data.expertise,
        });
        return res.json({ message: "Mentor Info Submitted Sucessfully!!" });
      } else {
        return res.json({ message: "Role is undefined!!!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Server Error", error });
    }
  },
};
export default AdditionalInfoController;
