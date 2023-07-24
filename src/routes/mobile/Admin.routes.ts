import { Router } from 'express';
import { Routes } from '@interfaces';
import Container from 'typedi';
import { AdminController } from '@controllers';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validattion.middleware';
import { CreateAdminDto } from '@dto/admin.dto';

export class AdminsRoute implements Routes {
  public path = 'v1/mobile/admins';
  public router = Router();
  public adminController = Container.get(AdminController);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, this.adminController.getAllAdmins);
    this.router.post(this.path, authMiddleware, validationMiddleware(CreateAdminDto, 'body'), this.adminController.createAdmin);
  }
}
