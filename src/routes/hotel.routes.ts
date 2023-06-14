import { validationMiddleware } from "./../middlewares/validattion.middleware";
import express from "express";
import HotelController from "@controllers/hotel.controller";
import authMiddleware from "@middlewares/auth.middleware";
import { InputHotelDto } from "@dto/hotel.dto";

const hotelRouter = express.Router();
const path = "/v1/hotel";

// Get all hotels
hotelRouter.get(`${path}/list`, HotelController.getAllHotels);

// Get a specific hotel
hotelRouter.get(`${path}/:id`, HotelController.getHotelById);

// Create a new hotel
hotelRouter.post(
  `${path}`,
  authMiddleware,
  validationMiddleware(InputHotelDto, "body"),
  HotelController.createHotel
);

// Update a hotel
hotelRouter.put(`${path}/:id`, HotelController.updateHotel);

// Delete a hotel
hotelRouter.delete(`${path}/:id`, HotelController.deleteHotel);

export default hotelRouter;
