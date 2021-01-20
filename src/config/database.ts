/** Import file dependencies */
import mongoose from 'mongoose';
import config from './config';
import { Logging } from 'madriesen-express-helper';

/** Set namespace */
const NAMESPACE = 'Config';

const database = {
  connect: async () => {
    /** Connect to database */
    return await mongoose.connect(
      config.database.connectionString,
      { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
      () => Logging.log.info(NAMESPACE, 'connected to DB!'),
    );
  },
  clearCollections: (collections: string[], callback?: any) => {
    mongoose.connection.on('open', () => {
      collections.forEach((collection) => {
        mongoose.connection.db.dropCollection(collection).catch(() => {
          return;
        });
      });
      callback();
    });
  },
};

export default database;
