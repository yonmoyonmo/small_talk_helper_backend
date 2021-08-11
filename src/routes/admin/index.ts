import * as express from 'express'
import adminController from './adminController';

const adminRouter = express.Router();

adminRouter.use('/', adminController)

export default adminRouter;