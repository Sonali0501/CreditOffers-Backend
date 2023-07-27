import '@utils/config.utils';
import App from './app';
import AccountRoutes from '@routes/accounts.route';
import OffersRoutes from '@routes/offers.route';

const app = new App([new AccountRoutes(), new OffersRoutes()]);
app.listen();

export default app;
