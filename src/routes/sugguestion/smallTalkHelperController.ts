import * as express from 'express'
import * as smallTalkHelperService from '../../services/smallTalkHelperService';

const smallTalkHelperController = express.Router();

smallTalkHelperController.get('/', (req, res) => {
  res.json({ test: "test" });
});

export default smallTalkHelperController;