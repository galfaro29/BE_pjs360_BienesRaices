import express from 'express';
import {
    authMiddleware,
    roleMiddleware,
} from '../middleware/index.js';
import {
    getManagerDashboard,
    getManagerProfile
} from '../controllers/managerController.js';

const router = express.Router();

/**
 * 📊 Manager Dashboard
 */
router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware('manager'),
    getManagerDashboard
);

/**
 * 👤 Get Staff Profile
 */
router.get(
    '/profile',
    authMiddleware,
    roleMiddleware('manager'),
    getManagerProfile
);

export default router;
