import { RoomType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomDto {
  @IsNotEmpty({ message: 'Hotel harus diisi!' })
  hotelId!: string;

  @IsNotEmpty({ message: 'Nomor Room harus diisi!' })
  @IsString({ message: 'Nomor room harus string!' })
  roomNumber!: string;

  @IsNotEmpty({ message: 'Tipe room harus diisi!' })
  @IsEnum(RoomType)
  type!: RoomType;

  @IsNotEmpty()
  @IsNumber()
  capacity!: number;

  @IsBoolean()
  availability!: boolean;

  @IsNotEmpty()
  @IsNumber()
  pricePerNight!: number;
}

export class CreateRoomDto extends RoomDto {}
export class UpadateRoomDto extends RoomDto {}
