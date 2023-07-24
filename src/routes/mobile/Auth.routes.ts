import { Router } from 'express';
import { Routes } from '@interfaces';
import Container from 'typedi';
import { AuthController } from '@controllers';

export class AuthRoute implements Routes {
  public path = 'v1/mobile/auth';
  public router = Router();
  public authController = Container.get(AuthController);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.authController.login);
  }
}
