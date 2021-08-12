import * as express from 'express'
import sugguestionController from "./sugguestionController";
import smallTalkHelperController from "./smallTalkHelperController";

const sugguestionRouter = express.Router();

sugguestionRouter.use('/', sugguestionController);
sugguestionRouter.use('/small-talk-helper', smallTalkHelperController);

export default sugguestionRouter;