import { NextFunction, Request, Response } from "express";
import AdminService from "@services/admin.service";
import { CreateAdminDto } from "@dto/admin.dto";

class AdminController {
  public static async getAllAdmins(req: Request, res: Response): Promise<void> {
    try {
      const admins = await AdminService.getAllAdmins();
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  }

  public static async createAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data: CreateAdminDto = req.body;

    try {
      const newAdmin = await AdminService.createAdmin(data);

      res.status(201).json({ message: "OK", result: newAdmin });
    } catch (error) {
      res.status(500).send(error);
      next(error);
    }
  }
}

export default AdminController;
