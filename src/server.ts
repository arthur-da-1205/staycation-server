import 'reflect-metadata';
import App from '@app';
import { AdminsRoute, AuthRoute, HotelsRoute, RoomsRoute } from '@routes/mobile';
import validateEnv from '@utils/validateEnv';

validateEnv();

const mobileRoutes = [new AuthRoute(), new AdminsRoute(), new HotelsRoute(), new RoomsRoute()];

const app = new App([...mobileRoutes]);

app.listen();
