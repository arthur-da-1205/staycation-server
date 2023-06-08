import { Jwt, sign } from "jsonwebtoken";
import { prisma } from "../libraries/prisma";
import { AuthLoginDto } from "../dto/auth.dto";
import { HttpException } from "../libraries/httpException";
import { Bcrypt } from "../libraries/bcrypt";

import bcrypt from "bcrypt";

class AuthService {
  public static async login(data: AuthLoginDto) {
    const admin = await prisma.admin.findUnique({
      where: { username: data.username },
    });

    if (!admin) {
      throw new HttpException(404, "User not found", "User not found");
    }

    const isPasswordValid = await bcrypt.compare(data.password, admin.password);

    if (!isPasswordValid) {
      console.log(isPasswordValid);
      console.log(data.password);
      console.log(admin.password);
    }

    // const isPasswordValid = await Bcrypt.check(data.password, admin.password);

    // if (!isPasswordValid) {
    //   throw new HttpException(
    //     404,
    //     "Invalid username or password",
    //     "Invalid username or password"
    //   );
    // }
    // const secretKey = process?.env?.JWT_SECRET;
    // const expiresIn = "1d";
    // return {
    //   expiresIn,
    //   token: sign({ adminId: admin.id }, secretKey as string, { expiresIn }),
    // };
  }
}

export default AuthService;
