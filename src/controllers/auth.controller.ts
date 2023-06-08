import { Request, Response } from "express";
import { AuthLoginDto } from "../dto/auth.dto";
import AuthService from "../services/auth.service";

class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = AuthService.login({ username, password });

      res.status(200).json(token);
    } catch (error) {
      res.status(401).json(error);
    }
  }
}

export default AuthController;
