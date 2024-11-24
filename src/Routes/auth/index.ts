import express from "express"
import {Router} from "express"
import Controller from "./controller";
import AuthValidator from "../../middlewares/authValidator";

const router = Router();

router.post('/register',AuthValidator.validateRegister,Controller.register);
router.post("/login",AuthValidator.validateLogin, Controller.login);

export {
  router as authRouter,
} 