import { IsNotEmpty, IsOptional } from 'class-validator';

export class HotelDto {
  @IsNotEmpty({ message: 'Alias hotel harus diisi!' })
  alias: string;

  @IsNotEmpty({ message: 'Nama hotel harus diisi!' })
  name: string;

  @IsNotEmpty({ message: 'Alamat harus diisi!' })
  address: string;

  @IsNotEmpty({ message: 'Kota harus diisi!' })
  city: string;

  @IsNotEmpty({ message: 'Negara harus diisi!' })
  country: string;

  @IsNotEmpty({ message: 'Rating harus diisi!' })
  rating: number;

  @IsNotEmpty({ message: 'Kisaran harga harus diisi!' })
  priceRange: string;

  @IsNotEmpty({ message: 'Fasilitas harus diisi!' })
  facilities: string;

  @IsOptional()
  description?: string;
}

export class InputHotelDto extends HotelDto {}
export class UpdateHotelDto extends HotelDto {}
