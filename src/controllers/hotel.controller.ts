import { NextFunction, Request, Response } from 'express';
import { HotelModel } from '@interfaces/hotel.model';
import HotelService from '@services/hotel.service';
import { InputHotelDto } from '@dto/hotel.dto';

class HotelController {
  public static async getAllHotels(req: Request, res: Response): Promise<void> {
    try {
      const hotels = await HotelService.getAllHotels();
      res.status(200).json({ message: 'OK', data: hotels });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  public static async getHotelById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const hotel = await HotelService.getHotelNyId(id);
      if (hotel) {
        res.status(200).json({ message: 'OK', data: hotel });
      } else {
        res.status(404).json({ error: 'Hotel not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  public static async createHotel(req: Request, res: Response, next: NextFunction) {
    const data: InputHotelDto = req.body;

    try {
      const newHotel = await HotelService.createHotel(data);

      res.status(201).json({ message: 'OK', result: newHotel });
    } catch (error) {
      res.status(500).json(error);
      next(error);
    }
  }

  public static async updateHotel(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, address, city, country, rating, price_range, amenities, description } = req.body;
    try {
      const updatedHotel = await HotelService.updateHotel(id, {
        name,
        address,
        city,
        country,
        rating,
        price_range,
        amenities,
        description,
      });
      res.status(200).json({ message: 'OK', data: updatedHotel });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

  public static async deleteHotel(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedHotel = await HotelService.deleteHotel(id);
      res.status(200).json({ message: 'OK', data: `${deletedHotel.name} deleted` });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
}

export default HotelController;
