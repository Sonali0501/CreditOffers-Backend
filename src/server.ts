import '@utils/config.utils';
import App from './app';
import AccountRoutes from './routes/accounts.route';

const app = new App([new AccountRoutes()]);
app.listen();

export default app;
