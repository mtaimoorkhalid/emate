import { Router } from "express";
import FormController from "../../controller/form/index.js";
import AuthenticationMiddleware from "../../middleware/authorization.js";
import FormValidator from "../../validator/form/index.js";

const FormRouter = Router();

FormRouter.post(
  "/user-form",
  AuthenticationMiddleware,
  FormValidator.submitForm,
  FormController.submitForm
);
export default FormRouter;
