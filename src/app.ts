import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config';
import database from './config/database';
import routes from './routes/routes';
import errorController from './controllers/error.controller';
import { Logging } from 'madriesen-express-helper';

const NAMESPACE = 'Server';
const app = express();

/** Parse request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

/** Routes */
app.use(routes);

/** Error handling */
app.use(errorController.serverError);

/** Database */
database.connect().then(() => {
  /** Clear items in database in development */
  if (process.env.NODE_ENV !== 'production') {
    database.clearCollections(['logs'], async () => {
      // insert seeders here
    });
  }
});

/** Create server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () =>
  Logging.log.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`),
);
