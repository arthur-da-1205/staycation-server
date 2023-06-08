import { IsNotEmpty, IsString } from "class-validator";

export class AdminDto {
  @IsString({ message: "Username harus huruf" })
  @IsNotEmpty({ message: "Username tidak boleh kosong" })
  username!: string;

  @IsNotEmpty({ message: "Password tidak boleh kosong" })
  password!: string;

  role!: string;
}

export class CreateAdminDto extends AdminDto {}
