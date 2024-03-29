import { Router } from "express";
import UserRouter from "./user/index.js";
import WrongApiRouter from "./wrongApi/index.js";
import AuthRouter from "./auth/index.js";
import FormRouter from "./form/index.js";
import SeekerRouter from "./seeker/index.js";
import MentorRouter from "./mentor/index.js";
import ConnectionRouter from "./connection/index.js";
import MessageRouter from "./message/index.js";

const AllRouters = Router();
AllRouters.use(UserRouter);
AllRouters.use(AuthRouter);
AllRouters.use(FormRouter);
AllRouters.use(SeekerRouter);
AllRouters.use(MentorRouter);
AllRouters.use(ConnectionRouter);
AllRouters.use(MessageRouter);
AllRouters.use(WrongApiRouter);

export default AllRouters;
