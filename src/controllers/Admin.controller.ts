import { NextFunction, Request, Response } from 'express';
import { CreateAdminDto } from '@dto/admin.dto';
import { AdminService } from '@services';
import { Service } from 'typedi';

@Service()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  public getAllAdmins = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.adminService.getAllAdmins();

      res.status(200).json({ message: 'Success get admin list', data: result });
    } catch (error) {
      next(error);
    }
  };

  public createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const args: CreateAdminDto = req.body;
      const result = await this.adminService.createAdmin(args);

      res.status(201).json({ message: 'Success create admin', data: result });
    } catch (error) {
      next(error);
    }
  };
}
