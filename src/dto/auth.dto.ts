import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
  @IsString({ message: "Username harus huruf" })
  @IsNotEmpty({ message: "Username tidak boleh kosong" })
  username!: string;

  @IsNotEmpty({ message: "Password tidak boleh kosong" })
  password!: string;
}
