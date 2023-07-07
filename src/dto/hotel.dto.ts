import { IsNotEmpty } from 'class-validator';

export class HotelDto {
  @IsNotEmpty({ message: 'Nama hotel harus diisi!' })
  name!: string;

  @IsNotEmpty({ message: 'Alamat harus diisi!' })
  address!: string;

  @IsNotEmpty({ message: 'Kota harus diisi!' })
  city!: string;

  @IsNotEmpty({ message: 'Kota harus diisi!' })
  country!: string;

  rating!: number;

  price_range!: string;

  @IsNotEmpty({ message: 'Kota harus diisi!' })
  amenities!: string;

  @IsNotEmpty({ message: 'Kota harus diisi!' })
  description!: string;
}

export class InputHotelDto extends HotelDto {}
export class UpdateHotelDto extends HotelDto {}
