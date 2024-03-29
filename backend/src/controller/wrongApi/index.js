const WrongApiController = {
  wrongApi: (req, res) => {
    try {
      res.json({ message: "You Gave Wrong Api Path" });
    } catch (error) {
      return res.status(400).json({ message: "Server Error", error });
    }
  },
};
export default WrongApiController;
