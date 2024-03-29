import UserModel from "../../model/user/index.js";

const UserController = {
  create: async (req, res) => {
    try {
      const { name, email, password, role, phone, address } = req.body;
      await UserModel.create({ name, email, password, role, phone, address });

      console.log(name, email, password, role, phone, address);
      return res.json({ message: "User Created" });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  get: async (req, res) => {
    try {
      const user = await UserModel.findAll();
      return res.json({ message: "Got All Users", user });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  update: async (req, res) => {
    try {
      const { name, email, password, role, phone, address } = req.body;
      const user = await UserModel.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      user.name = name;
      user.email = email;
      user.password = password;
      user.role = role;
      user.phone = phone;
      user.address = address;
      await user.save();
      return res.json({
        message: `Updated the user details with id: ${req.user.id}`,
        user,
      });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
  delete: async (req, res) => {
    try {
      const user = await UserModel.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      await user.destroy();
      return res.json({
        message: `Deleted the user details with id: ${req.user.id}`,
      });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
};

export default UserController;
