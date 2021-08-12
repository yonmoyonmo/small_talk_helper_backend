import * as express from 'express'
import sugguestionController from "./sugguestionController";
import smallTalkHelperController from "./smallTalkHelperController";

const sugguestionRouter = express.Router();

sugguestionRouter.use('/', sugguestionController); // /sugguestion
sugguestionRouter.use('/small-talk-helper', smallTalkHelperController); // /sugguestion/small-talk-helper

export default sugguestionRouter;