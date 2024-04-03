import { Router } from "express";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import AdditionalInfoValidator from "../../validator/additionalInfo/index.js";
import AdditionalInfoController from "../../controller/additionalInfo/index.js";

const AdditionalInfoRouter = Router();

AdditionalInfoRouter.post(
  "/addInfo",
  AuthenticationMiddleware,
  AdditionalInfoValidator.addInfo,
  AdditionalInfoController.addInfo
);
export default AdditionalInfoRouter;
