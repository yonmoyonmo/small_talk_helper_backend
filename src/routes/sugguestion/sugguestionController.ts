import * as express from 'express'
import * as sugguestionService from '../../services/suguestionService';

const sugguestionController = express.Router();

sugguestionController.post('/register', (req, res) => {
  const result = sugguestionService.createSuggestion(req);
  if (result) {
    res.status(200).json({
      message: "new sugguestion added",
      success: true
    });
  } else {
    res.status(500).json({
      message: "inserting new sugguestion failed",
      success: false
    });
  }
});

sugguestionController.post('/update', (req, res) => {
  const result = sugguestionService.updateSugguestion(req);
  if (result) {
    res.status(200).json({
      message: "sugguestion updated",
      success: true
    });
  } else {
    res.status(500).json({
      message: "sugguestion update failed",
      success: false
    });
  }
});

sugguestionController.get('/list', async (req, res) => {
  const result = await sugguestionService.getSugguestionList(req);
  const count = result.length;
  if (count === 0) {
    res.status(200).json({ message: "empty" })
  } else {
    res.status(200).send(result);
  }
});

sugguestionController.delete('/delete', (req, res)=>{
  const result = sugguestionService.deleteSugguestion(req);
  if (result) {
    res.status(200).json({
      message: "sugguestion delete",
      success: true
    });
  } else {
    res.status(500).json({
      message: "failed",
      success: false
    });
  }
});

export default sugguestionController;