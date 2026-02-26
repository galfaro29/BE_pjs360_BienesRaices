import { StaffInteraction, StaffProfile, User } from "../models/index.js";

/**
 * getOperationsDashboard
 * — Resumen de operaciones internas
 */
const getOperationsDashboard = async (req: any, res: any) => {
    try {
        const activeInteractions = await StaffInteraction.count({ where: { status: 'open' } });

        res.json({
            code: "SUCCESS_OPERATIONS_DASHBOARD",
            user: req.user,
            activeInteractions
        });
    } catch (error) {
        console.error("Error al obtener dashboard de operaciones:", error);
        res.status(500).json({ code: "ERR_FETCH_OPERATIONS_DASHBOARD" });
    }
};

/**
 * listAllInteractions
 * — Lista todas las interacciones de staff (uso administrativo/operaciones)
 */
const listAllInteractions = async (req: any, res: any) => {
    try {
        const interactions = await StaffInteraction.findAll({
            include: [
                { model: StaffProfile, as: 'staff', include: [{ model: User, as: 'user', attributes: ['name'] }] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ code: "SUCCESS_FETCH_INTERACTIONS", interactions });
    } catch (error) {
        console.error("Error al obtener interacciones:", error);
        res.status(500).json({ code: "ERR_FETCH_INTERACTIONS" });
    }
};

export {
    getOperationsDashboard,
    listAllInteractions
};
