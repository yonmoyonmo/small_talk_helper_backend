import * as express from 'express'

const adminController = express.Router();

adminController.get('/test', (req, res) => {
  res.json({
    testMessage: "test_admin_rouutes"
  })
})

export default adminController;