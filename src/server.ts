import App from '@app';
import { AuthRoute } from '@routes/mobile';
import validateEnv from '@utils/validateEnv';

validateEnv();

const mobileRoutes = [new AuthRoute()];

const app = new App([...mobileRoutes]);

app.listen();
