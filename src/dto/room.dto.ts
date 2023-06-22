import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomDto {
  @IsNotEmpty({ message: 'Hotel harus diisi!' })
  hotel_id!: string;

  @IsNotEmpty({ message: 'Nomor Room harus diisi!' })
  @IsString({ message: 'Nomor room harus string!' })
  room_number!: string;

  @IsNotEmpty({ message: 'Tipe room harus diisi!' })
  room_type!: string;

  @IsNumber()
  capacity!: number;

  @IsBoolean()
  availability!: boolean;

  @IsNumber()
  price_per_night!: number;
}

export class CreateRoomDto extends RoomDto {}
export class UpadateRoomDto extends RoomDto {}
