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
    res.status(500).json({success: false})
  }
});

smallTalkHelperController.post('/likes', async (req, res)=>{
  try{
    const result = await smallTalkHelperService.applyLikes(req);
    if(result){
      res.status(200).json({success: true})
    }else{
      res.status(500).json({success: false})
    }
  }catch(e){
    console.error(e);
    res.status(500).json({success: false})
  }
});

smallTalkHelperController.get('/topten', async (req, res) => {
  try{
    const result = await smallTalkHelperService.getTopTenList();
    res.status(200).send(result);
  }catch(e){
    console.error(e);
    res.status(500).json({success: false})
  }
});

smallTalkHelperController.post('/users-sugguestion', async (req, res)=>{
  try{
    const result = await smallTalkHelperService.createUserSugguestion(req);
    if(result){
      res.status(200).json({success: true})
    }else{
      res.status(500).json({success: false})
    }
  }catch(e){
    console.error(e);
    res.status(500).json({success: false})
  }
})

export default smallTalkHelperController;