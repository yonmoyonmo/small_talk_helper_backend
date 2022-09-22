import * as express from 'express'
import sugguestionController from "./sugguestionController.js";
import smallTalkHelperController from "./smallTalkHelperController.js";

const sugguestionRouter = express.Router();

sugguestionRouter.use('/', sugguestionController); // /sugguestion
sugguestionRouter.use('/small-talk-helper', smallTalkHelperController); // /sugguestion/small-talk-helper

export default sugguestionRouter;