import { Router } from 'express';

import AdminController from '@controllers/admin.controller';
import { CreateAdminDto } from '@dto/admin.dto';
import { validationMiddleware } from '@middlewares/validattion.middleware';
import authMiddleware from '@middlewares/auth.middleware';

const adminRouter = Router();
const path = '/v1/admin';

adminRouter.post(`${path}`, authMiddleware, AdminController.createAdmin);
adminRouter.get(`${path}/list`, AdminController.getAllAdmins);

export default adminRouter;
