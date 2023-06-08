import { InputHotelDto } from "src/dto/hotel.dto";
import { prisma } from "../libraries/prisma";
import { HotelModel } from "../interfaces/hotel.model";

class HotelService {
  public static async getAllHotels(): Promise<HotelModel[]> {
    const hotels = await prisma.hotel.findMany();

    return hotels;
  }

  public static async getHotelNyId(id: string): Promise<HotelModel | null> {
    return prisma.hotel.findUnique({
      where: { hotel_id: id },
    });
  }

  public static async createHotel(data: InputHotelDto) {
    return prisma.hotel.create({ data });
  }

  public static async updateHotel(
    id: string,
    data: Partial<HotelModel>
  ): Promise<HotelModel> {
    return prisma.hotel.update({
      where: { hotel_id: id },
      data,
    });
  }

  public static async deleteHotel(id: string): Promise<HotelModel> {
    return prisma.hotel.delete({
      where: { hotel_id: id },
    });
  }
}

export default HotelService;
