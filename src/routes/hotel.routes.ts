import HotelController from '@controllers/hotel.controller';
import authMiddleware from '@middlewares/auth.middleware';
import express from 'express';

const hotelRouter = express.Router();
const path = '/v1/hotel';

// Get all hotels
hotelRouter.get(`${path}/list`, HotelController.getAllHotels);

// Get a specific hotel
hotelRouter.get(`${path}/:id`, HotelController.getHotelById);

// Create a new hotel
hotelRouter.post(`${path}`, authMiddleware, HotelController.createHotel);

// Update a hotel
hotelRouter.put(`${path}/:id`, authMiddleware, HotelController.updateHotel);

// Delete a hotel
hotelRouter.delete(`${path}/:id`, authMiddleware, HotelController.deleteHotel);

export default hotelRouter;
