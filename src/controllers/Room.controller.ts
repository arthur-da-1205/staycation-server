import { CreateRoomDto, UpadateRoomDto } from '@dto/room.dto';
import { HttpException } from '@libraries/httpException';
import { prisma } from '@libraries/prisma';
import { RoomModel } from '@model/room.model';
import HotelService from '@services/Hotel.service';
import RoomService from '@services/Room.service';
import { NextFunction, Request, Response } from 'express';

class RoomController {
  public static async getAllRooms(req: Request, res: Response): Promise<void> {
    try {
      const rooms = await RoomService.getAllRooms();

      res.status(200).json({ message: 'OK', data: rooms });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  public static async getRoomById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const room = await RoomService.getRoomById(id);

      if (room) {
        const hotel = await HotelService.getHotelById(room?.hotel_id);

        const hotelName = hotel?.name;

        res.status(200).json({ message: 'OK', data: { hotelName, ...room } });
      } else {
        res.status(404).json({ message: 'Room not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  public static async createRoom(req: Request, res: Response, next: NextFunction) {
    const data: CreateRoomDto = req.body;

    try {
      const room = await RoomService.createRoom(data);

      res.status(201).json({ message: 'OK', result: room });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
      next(error);
    }
  }

  public static async updateRoom(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data: UpadateRoomDto = req.body;

    try {
      const updatedRoom = await RoomService.updateRoom(id, data);

      res.status(200).json({ message: 'OK', data: updatedRoom });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  public static async deleteRoom(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const deletedRoom = await RoomService.deleteRoom(id);

      res.status(200).json({ message: 'OK', data: `${deletedRoom.room_id} deleted` });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  }
}

export default RoomController;
