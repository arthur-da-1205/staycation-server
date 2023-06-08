import { CreateAdminDto } from "src/dto/admin.dto";
import { prisma } from "../libraries/prisma";
import { Admin } from "../interfaces/admin.model";
import { HttpException } from "../libraries/httpException";
import { Bcrypt } from "../libraries/bcrypt";

class AdminService {
  public static async getAllAdmins(): Promise<Admin[]> {
    return await prisma.admin.findMany();
  }

  public static async createAdmin(data: CreateAdminDto) {
    const checkExisting = await prisma.admin.findFirst({
      where: { username: data.username },
      select: { username: true },
    });

    if (checkExisting)
      throw new HttpException(400, "Something went wrong", {
        username: ["Username sudah terdaftar"],
      });

    if (!data.password)
      throw new HttpException(
        400,
        "Something went wrong",
        "Password cannot be empty!"
      );

    const hashedPassword = await Bcrypt.encrypt(data.password);

    return await prisma.admin.create({
      data: {
        username: data.username,
        password: hashedPassword,
        role: data.role,
      },
    });
  }
}

export default AdminService;
