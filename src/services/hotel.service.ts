import { InputHotelDto, UpdateHotelDto } from '@dto/hotel.dto';
import { prisma } from '@libraries/prisma';
import { HotelModel } from '@model/hotel.model';

class HotelService {
  public static async getAllHotels(): Promise<HotelModel[]> {
    const hotels = await prisma.hotel.findMany({
      include: {
        rooms: true,
      },
    });

    return hotels;
  }

  public static async getHotelById(id: string): Promise<HotelModel | null> {
    return await prisma.hotel.findUnique({
      where: { hotel_id: id },
    });
  }

  public static async createHotel(data: InputHotelDto) {
    return await prisma.hotel.create({ data });
  }

  public static async updateHotel(id: string, data: Partial<UpdateHotelDto>): Promise<HotelModel> {
    return prisma.hotel.update({
      where: { hotel_id: id },
      data,
    });
  }

  public static async deleteHotel(id: string): Promise<HotelModel> {
    return await prisma.hotel.delete({
      where: { hotel_id: id },
    });
  }
}

export default HotelService;
