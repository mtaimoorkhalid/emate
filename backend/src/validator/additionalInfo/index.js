import Joi from "joi";

const AdditionalInfoValidator = {
  addInfo: (req, res, next) => {
    const schema = Joi.object({
      expertise: Joi.string(),
      education: Joi.string(),
    });
    const response = schema.validate(req.body);
    if (response.error) {
      return res
        .status(400)
        .json({ message: "Bad Data", error: response.error });
    }
    next();
  },
};
export default AdditionalInfoValidator;
