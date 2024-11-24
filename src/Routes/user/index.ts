import { Router } from "express";
import Controller from "./controller";
import isLogin from "../../middlewares/auth";

const router = Router();

router.get("/info", isLogin, Controller.info);

export { router as userRouter };
