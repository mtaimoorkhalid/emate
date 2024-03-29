import { Router } from "express";
import WrongApiController from "../../controller/wrongApi/index.js";

const WrongApiRouter = Router();
WrongApiRouter.get("*", WrongApiController.wrongApi);
WrongApiRouter.post("*", WrongApiController.wrongApi);
WrongApiRouter.delete("*", WrongApiController.wrongApi);
WrongApiRouter.patch("*", WrongApiController.wrongApi);
WrongApiRouter.put("*", WrongApiController.wrongApi);
WrongApiRouter.options("*", WrongApiController.wrongApi);
WrongApiRouter.head("*", WrongApiController.wrongApi);
export default WrongApiRouter;
