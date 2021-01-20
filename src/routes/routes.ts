/** Import file dependencies */
import express from 'express';
import { Logging } from 'madriesen-express-helper';
import errorController from '../controllers/error.controller';

/** Create router */
const router = express.Router();

router.use(Logging.requestLog);
router.use('*', errorController.notFound);
export default router;
