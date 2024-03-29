import Jwt from "jsonwebtoken";
import "dotenv/config";
const AuthenticationMiddleware = (req, res, next) => {
  const header = req.headers;
  let token = header.authorization.split(" ");
  token = token[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }
  try {
    const userData = Jwt.verify(token, process.env.JWT_SIGNATURE);
    req.user = userData;
  } catch (error) {
    console.log(error, "error");

    return res
      .status(401)
      .json({ message: "Invalid token - please login again" });
  }
  next();
};
export default AuthenticationMiddleware;
