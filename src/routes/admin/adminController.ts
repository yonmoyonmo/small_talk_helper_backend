import * as express from 'express'
import * as adminService from '../../services/adminService.js';
import * as jwt from 'jsonwebtoken';

const adminController = express.Router();

adminController.post('/register', async (req, res) => {
  const result = await adminService.registerAdmin(req);
  if (result) {
    res.status(200).json({ success: true, message: "new admin is registered" });
  } else {
    res.status(500).json({ success: false, message: "new admin register failed" });
  }
})

adminController.post('/login', async (req, res) => {
  const result = await adminService.loginAdmin(req);
  if (result) {
    const { admin_name } = req.body
    const secret = process.env.jwtSecret;
    const token = await jwt.sign({ adminName: admin_name }, secret, { expiresIn: "3h" });
    res.status(200).json({ success: true, message: "logged in", token: token });
  } else {
    res.status(500).json({ success: false, message: "loggin failed", token: null });
  }
})

export default adminController;