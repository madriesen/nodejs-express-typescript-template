/** import file dependencies */
import { Request, Response as expressResponse, NextFunction } from 'express';
import { Response, Logging } from 'madriesen-express-helper';

const NAMESPACE = 'Errorcontroller';

const notFound = (req: Request, res: expressResponse) => {
  return Response.send.error(res, 404, { message: 'Endpoint not found' });
};

const serverError = (error: any, req: Request, res: expressResponse, next: NextFunction) => {
  Logging.log.error(NAMESPACE, error.toString(), error);
  return Response.send.error(res, error.statusCode || 500, error.toString());
};

export default {
  notFound,
  serverError,
};
