import { CreateRoomDto, UpadateRoomDto } from '@dto/room.dto';
import { HttpException } from '@libraries/httpException';
import { prisma } from '@libraries/prisma';
import { RoomModel } from '@model/room.model';

class RoomService {
  public static async getAllRooms(): Promise<any[]> {
    const rooms = await prisma.room.findMany();

    // const groupedData: { [key: string]: any[] } = {};

    // for (const room of rooms) {
    //   const hotelId = room.hotel_id;

    //   const hotel = await prisma.hotel.findFirst({
    //     where: { hotel_id: hotelId },
    //   });

    //   if (groupedData.hasOwnProperty(hotelId)) {
    //     groupedData[hotel?.name].push({
    //       hotel: hotel?.name,
    //       room,
    //     });
    //   } else {
    //     groupedData[hotel?.name] = [hotel?.name, room];
    //   }
    // }

    // return groupedData as any;

    return rooms;
  }

  public static async getRoomById(id: string): Promise<any | null> {
    const room = await prisma.room.findUnique({
      where: { room_id: id },
    });

    return room;
  }

  public static async createRoom(data: CreateRoomDto) {
    const hotelIsExist = await prisma.hotel.findUnique({
      where: { hotel_id: data.hotel_id },
    });

    if (!hotelIsExist) {
      throw new HttpException(404, 'Hotel belum terdaftar', 'Hotel belum terdaftar');

      return;
    }

    return await prisma.room.create({ data });
  }

  public static async updateRoom(id: string, data: Partial<UpadateRoomDto>): Promise<RoomModel> {
    return await prisma.room.update({
      where: { room_id: id },
      data,
    });
  }

  public static async deleteRoom(id: string): Promise<RoomModel> {
    return await prisma.room.delete({
      where: { room_id: id },
    });
  }
}

export default RoomService;
