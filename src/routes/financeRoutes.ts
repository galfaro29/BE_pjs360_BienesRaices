import express from 'express';
import {
    authMiddleware,
    roleMiddleware,
} from '../middleware/index.js';
import {
    getFinanceDashboard,
    getAllStaffPayments
} from '../controllers/financeController.js';

const router = express.Router();

/**
 * 💰 Finance Dashboard
 */
router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware('finance'),
    getFinanceDashboard
);

/**
 * 💳 List all staff payments
 */
router.get(
    '/payments',
    authMiddleware,
    roleMiddleware('finance'),
    getAllStaffPayments
);

export default router;
