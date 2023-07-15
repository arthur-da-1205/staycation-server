import { Jwt, sign } from 'jsonwebtoken';
import { prisma } from '../libraries/prisma';
import { AuthLoginDto } from '@dto/auth.dto';
import { Bcrypt } from '../libraries/bcrypt';
import bcrypt from 'bcrypt';
import { AuthDataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';

@Service()
export class AuthService {
  public async login(data: AuthLoginDto) {
    const admin = await prisma.admin.findUnique({
      where: { username: data.username },
    });

    if (!admin) {
      throw new HttpException(404, 'User not found', 'User not found');

      return;
    }

    const isPasswordValid = await Bcrypt.check(data.password, admin.password);

    // if (!isPasswordValid) {
    //   console.log(isPasswordValid);
    //   console.log(data.password);
    //   console.log(admin.password);
    // }

    // const isPasswordValid = await Bcrypt.check(data.password, admin.password);

    if (!isPasswordValid) {
      throw new HttpException(404, 'Invalid username or password', 'Invalid username or password');

      return;
    }

    const tokenData = this.createToken({
      id: admin.id,
      username: data.username,
      role: 'admin',
    });

    // const cookie = this.createCookie(tokenData);

    return { tokenData };
  }

  private createToken(data: AuthDataStoredInToken): TokenData {
    const secretKey: string = process?.env?.JWT_SECRET as string;
    const expiresIn: number = 6 * 60 * 60; // seconds

    return { expiresIn, token: sign(data, secretKey, { expiresIn }) };
  }
}
