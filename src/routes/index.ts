import * as express from 'express'
import adminRoutes from "./admin/index.js";
import sugguestionRoutes from "./sugguestion/index.js";
import donatorRoutes from "./donator/index.js";

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/sugguestion', sugguestionRoutes);
router.use('/donator', donatorRoutes);

export default router;