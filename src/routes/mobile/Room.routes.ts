import { Router } from 'express';
import { Routes } from '@interfaces';
import Container from 'typedi';
import { RoomController } from '@controllers';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validattion.middleware';
import { CreateRoomDto, UpadateRoomDto } from '@dto/room.dto';

export class RoomsRoute implements Routes {
  public path = 'v1/mobile/rooms';
  public router = Router();
  public roomController = Container.get(RoomController);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, this.roomController.getAllRooms);
    this.router.get(`${this.path}/:id`, authMiddleware, this.roomController.getRoomById);
    this.router.post(this.path, authMiddleware, validationMiddleware(CreateRoomDto, 'body'), this.roomController.createRoom);
    this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddleware(UpadateRoomDto, 'body'), this.roomController.updateRoom);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.roomController.deleteRoom);
  }
}
