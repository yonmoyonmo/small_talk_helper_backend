import * as express from 'express'
import adminRoutes from "./admin/index";
import sugguestionRoutes from "./sugguestion/index";
import donatorRoutes from "./donator/index";

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/sugguestion', sugguestionRoutes);
router.use('/donator', donatorRoutes);

export default router;