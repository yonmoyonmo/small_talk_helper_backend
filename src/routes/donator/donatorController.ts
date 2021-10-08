import * as express from 'express'
import * as donatorService from '../../services/donatorService';


const donatorController = express.Router();

// /donator/registor

donatorController.post('/register', async (req, res) => {
  const result = await donatorService.registerDonator(req);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
});


donatorController.post('/check', async (req, res) => {
  const result = await donatorService.check(req);
  if (result) {
    res.status(200).json({ success: true, message: "donator check success" });
  } else {
    res.status(500).json({ success: false, message: "donator check fail" });
  }
});

export default donatorController;