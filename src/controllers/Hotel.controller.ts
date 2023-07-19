import { InputHotelDto, UpdateHotelDto } from '@dto/hotel.dto';
import { HotelService } from '@services';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  public getAllHotels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.hotelService.getAllHotels();

      res.status(200).json({ message: 'Success get hotel list', data: result });
    } catch (error) {
      next(error);
    }
  };

  public getHotelById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.hotelService.getHotelById(id);

      res.status(200).json({ message: 'Success get hotel by id', data: result });
    } catch (error) {
      next(error);
    }
  };

  public createHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const args: InputHotelDto = req.body;
      const result = await this.hotelService.createHotel(args);

      res.status(201).json({ message: 'Success create hotel', data: result });
    } catch (error) {
      next(error);
    }
  };

  public updateHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const args: UpdateHotelDto = req.body;
      const result = await this.hotelService.updateHotel(id, args);

      res.status(200).json({ message: 'Success update hotel', data: result });
    } catch (error) {
      next(error);
    }
  };

  public deleteHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.hotelService.deleteHotel(id);

      res.status(200).json({ message: 'Success delete hotel', data: result });
    } catch (error) {
      next(error);
    }
  };

  // public async getHotelById(req: Request, res: Response): Promise<void> {
  //   const { id } = req.params;

  //   try {
  //     const hotel = await HotelService.getHotelById(id);

  //     if (hotel) {
  //       res.status(200).json({ message: 'OK', data: hotel });
  //     } else {
  //       res.status(404).json({ error: 'Hotel not found' });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: 'An error occurred' });
  //   }
  // }
}
