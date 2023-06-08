import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import { validationMiddleware } from "src/middlewares/validattion.middleware";
import { CreateAdminDto } from "src/dto/admin.dto";

const adminRouter = Router();
const path = "/v1/admin";

adminRouter.post(
  `${path}`,
  validationMiddleware(CreateAdminDto, "body"),
  AdminController.createAdmin
);
adminRouter.get(`${path}/list`, AdminController.getAllAdmins);

export default adminRouter;
