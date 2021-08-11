import * as express from 'express'
import sugguestionController from "./sugguestionController";

const sugguestionRouter = express.Router();

sugguestionRouter.use('/', sugguestionController);

export default sugguestionRouter;