import { InputHotelDto, UpdateHotelDto } from '@dto/hotel.dto';
import { HttpException } from '@exceptions/HttpException';
import { prisma } from '@libraries/prisma';
import { Hotel } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class HotelService {
  public async getAllHotels(): Promise<Hotel[]> {
    const hotels = await prisma.hotel.findMany({
      include: { Rooms: true },
    });

    return hotels;
  }

  public async getHotelById(id: string): Promise<Hotel> {
    const hotel = await prisma.hotel.findUnique({ where: { id } });
    if (!hotel) throw new HttpException(404, 'Hotel tidak ditemukan');

    return hotel;
  }

  public async createHotel(data: InputHotelDto) {
    return await prisma.hotel.create({ data });
  }

  public async updateHotel(id: string, data: Partial<UpdateHotelDto>): Promise<Hotel> {
    return prisma.hotel.update({
      where: { id },
      data,
    });
  }

  public async deleteHotel(id: string): Promise<Hotel> {
    return await prisma.hotel.delete({
      where: { id },
    });
  }
}
