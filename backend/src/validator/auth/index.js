import Joi from "joi";

const AuthValidator = {
  register: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      confirm_password: Joi.ref("password"),
      role: Joi.string().min(6).max(6).required(),
      phone: Joi.string().min(11).max(15).required(),
      address: Joi.string().min(3).max(100).required(),
    });
    const response = schema.validate(req.body);
    if (response.error) {
      return res
        .status(400)
        .json({ message: "Bad Data", error: response.error });
    }
    next();
  },
  login: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
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
export default AuthValidator;
