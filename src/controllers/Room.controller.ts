import { CreateRoomDto, UpadateRoomDto } from '@dto/room.dto';
import { RoomService } from '@services';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  public getAllRooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.roomService.getAllRooms();

      res.status(200).json({ message: 'Success get room list', data: result });
    } catch (error) {
      next(error);
    }
  };

  public getRoomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.roomService.getRoomById(id);

      res.status(200).json({ message: 'Success get room by id', data: result });
    } catch (error) {
      next(error);
    }
  };

  public createRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const args: CreateRoomDto = req.body;
      const result = await this.roomService.createRoom(args);

      res.status(201).json({ message: 'Success create room', data: result });
    } catch (error) {
      next(error);
    }
  };

  public updateRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const args: UpadateRoomDto = req.body;
      const result = await this.roomService.updateRoom(id, args);

      res.status(200).json({ message: 'Success update room', data: result });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.roomService.deleteRoom(id);

      res.status(200).json({ message: 'Success delete room', data: result });
    } catch (error) {
      next(error);
    }
  };

  // public static async getRoomById(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;

  //   try {
  //     const room = await RoomService.getRoomById(id);

  //     if (room) {
  //       const hotel = await HotelService.getHotelById(room?.hotel_id);

  //       const hotelName = hotel?.name;

  //       res.status(200).json({ message: 'OK', data: { hotelName, ...room } });
  //     } else {
  //       res.status(404).json({ message: 'Room not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: 'An error occurred' });
  //   }
  // }
}
