import * as express from 'express'

const sugguestionController = express.Router();

sugguestionController.get('/test', (req, res) => {
  res.json({
    testMessage: "test_sugguestion_rouutes"
  })
})

export default sugguestionController;