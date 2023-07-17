import RoomController from '@controllers/Room.controller';
import authMiddleware from '@middlewares/auth.middleware';
import express from 'express';

const roomRouter = express.Router();
const path = '/v1/room';

// Get All Rooms
roomRouter.get(`${path}/list`, RoomController.getAllRooms);

// Get Specific Room
roomRouter.get(`${path}/:id`, RoomController.getRoomById);

// Create new room
roomRouter.post(`${path}`, authMiddleware, RoomController.createRoom);

// Update a hotel
roomRouter.put(`${path}/:id`, authMiddleware, RoomController.updateRoom);

// Delete a room
roomRouter.delete(`${path}/:id`, authMiddleware, RoomController.deleteRoom);

export default roomRouter;
