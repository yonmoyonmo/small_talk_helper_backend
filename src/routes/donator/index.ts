import * as express from 'express'
import donatorController from './donatorController.js';

const adminRouter = express.Router();

adminRouter.use('/', donatorController)

export default adminRouter;