import express from "express";
import AuthController from "../controllers/auth.controller";

const authRouter = express.Router();
const path = "/v1/auth";

authRouter.post(`${path}/login`, AuthController.login);

export default authRouter;
