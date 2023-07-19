import { InputHotelDto, UpdateHotelDto } from '@dto/hotel.dto';
import { prisma } from '@libraries/prisma';
import { HotelModel } from '@model/hotel.model';
import { Service } from 'typedi';

@Service()
export class HotelService {
  public async getAllHotels(): Promise<HotelModel[]> {
    const hotels = await prisma.hotel.findMany({
      include: {
        rooms: true,
      },
    });

    return hotels;
  }

  public async getHotelById(id: string): Promise<HotelModel | null> {
    return await prisma.hotel.findUnique({
      where: { hotel_id: id },
    });
  }

  public async createHotel(data: InputHotelDto) {
    return await prisma.hotel.create({ data });
  }

  public async updateHotel(id: string, data: Partial<UpdateHotelDto>): Promise<HotelModel> {
    return prisma.hotel.update({
      where: { hotel_id: id },
      data,
    });
  }

  public async deleteHotel(id: string): Promise<HotelModel> {
    return await prisma.hotel.delete({
      where: { hotel_id: id },
    });
  }
}
