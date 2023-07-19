import { CreateRoomDto, UpadateRoomDto } from '@dto/room.dto';
import { HttpException } from '@exceptions/HttpException';
import { prisma } from '@libraries/prisma';
import { RoomModel } from '@model/room.model';
import { Room } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class RoomService {
  public async getAllRooms(): Promise<any[]> {
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

  public async getRoomById(id: string): Promise<any | null> {
    const room = await prisma.room.findUnique({
      where: { id },
    });

    return room;
  }

  public async createRoom(data: CreateRoomDto) {
    const hotelIsExist = await prisma.hotel.findFirst({
      where: { id: data.hotelId },
    });

    if (!hotelIsExist) {
      throw new HttpException(404, 'Hotel belum terdaftar', 'Hotel belum terdaftar');

      return;
    }

    return await prisma.room.create({ data });
  }

  public async updateRoom(id: string, data: Partial<UpadateRoomDto>): Promise<Room> {
    return await prisma.room.update({
      where: { id },
      data,
    });
  }

  public async deleteRoom(id: string): Promise<Room> {
    return await prisma.room.delete({
      where: { id },
    });
  }
}
