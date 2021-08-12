import * as express from 'express'
import * as smallTalkHelperService from '../../services/smallTalkHelperService';

const smallTalkHelperController = express.Router();

// /sugguestion/small-talk-helper/random
smallTalkHelperController.get('/random', async (req, res)=>{
  try{
    const result = await smallTalkHelperService.getRandomSugguestion();
    res.status(200).send(result);
  }catch(e){
    console.error(e);
  }
});

export default smallTalkHelperController;