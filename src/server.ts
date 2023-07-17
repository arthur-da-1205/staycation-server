import App from '@app';
import { AdminsRoute, AuthRoute } from '@routes/mobile';
import validateEnv from '@utils/validateEnv';

validateEnv();

const mobileRoutes = [new AuthRoute(), new AdminsRoute()];

const app = new App([...mobileRoutes]);

app.listen();
