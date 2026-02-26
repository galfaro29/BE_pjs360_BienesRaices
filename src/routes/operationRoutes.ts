import express from 'express';
import {
    authMiddleware,
    roleMiddleware,
} from '../middleware/index.js';
import {
    getOperationsDashboard,
    listAllInteractions
} from '../controllers/operationController.js';

const router = express.Router();

/**
 * ⚙️ Operations Dashboard
 */
router.get(
    '/dashboard',
    authMiddleware,
    roleMiddleware('operation'),
    getOperationsDashboard
);

/**
 * 💬 List all staff interactions
 */
router.get(
    '/interactions',
    authMiddleware,
    roleMiddleware('operation'),
    listAllInteractions
);

export default router;
