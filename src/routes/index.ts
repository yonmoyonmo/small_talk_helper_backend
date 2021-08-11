import * as express from 'express'
import adminRoutes from "./admin/index";
import sugguestionRoutes from "./sugguestion/index";

const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/sugguestion', sugguestionRoutes);

export default router;