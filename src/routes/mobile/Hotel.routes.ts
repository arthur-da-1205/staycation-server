import { Router } from 'express';
import { Routes } from '@interfaces';
import Container from 'typedi';
import { HotelController } from '@controllers';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validattion.middleware';
import { InputHotelDto, UpdateHotelDto } from '@dto/hotel.dto';

export class HotelsRoute implements Routes {
  public path = 'v1/mobile/hotels';
  public router = Router();
  public hotelController = Container.get(HotelController);

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/list`, authMiddleware, this.hotelController.getAllHotels);
    this.router.get(`${this.path}/:id`, authMiddleware, this.hotelController.getHotelById);
    this.router.post(this.path, authMiddleware, validationMiddleware(InputHotelDto, 'body'), this.hotelController.createHotel);
    this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddleware(UpdateHotelDto, 'body'), this.hotelController.updateHotel);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.hotelController.deleteHotel);
  }
}
