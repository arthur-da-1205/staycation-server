import { CreateAdminDto } from '@dto/admin.dto';
import { AdminModel } from '@model/admin.model';
import { Bcrypt } from '@libraries/bcrypt';
import { prisma } from '@libraries/prisma';
import { HttpException } from '@exceptions/HttpException';
import { Service } from 'typedi';

@Service()
export class AdminService {
  public static async getAllAdmins(): Promise<AdminModel[]> {
    return await prisma.admin.findMany();
  }

  public static async createAdmin(data: CreateAdminDto) {
    const checkExisting = await prisma.admin.findFirst({
      where: { username: data.username },
      select: { username: true },
    });

    if (checkExisting) throw new HttpException(400, 'Something went wrong', 'Username sudah terdaftar');

    if (!data.password) throw new HttpException(400, 'Something went wrong', 'Password cannot be empty!');

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
