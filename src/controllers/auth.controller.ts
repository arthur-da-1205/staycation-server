import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { AuthService } from '@services';

@Service()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body;
      const result = await this.authService.login({ username, password });

      res.status(200).json({ message: 'Berhasil login', data: result });
    } catch (error) {
      next(error);
    }
  };
}
