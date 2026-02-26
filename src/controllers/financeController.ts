import { StaffProfile, StaffPayment, StaffPaymentInfo, User } from "../models/index.js";

/**
 * getFinanceDashboard
 * — Devuelve métricas financieras iniciales
 */
const getFinanceDashboard = async (req: any, res: any) => {
    try {
        // Aquí se podrían agregar cálculos de pagos pendientes o totales
        res.json({
            code: "SUCCESS_FINANCE_DASHBOARD",
            user: req.user
        });
    } catch (error) {
        console.error("Error al obtener dashboard de finance:", error);
        res.status(500).json({ code: "ERR_FETCH_FINANCE_DASHBOARD" });
    }
};

/**
 * getAllStaffPayments
 * — Lista todos los pagos de staff registrados (uso administrativo/finanzas)
 */
const getAllStaffPayments = async (req: any, res: any) => {
    try {
        const payments = await StaffPayment.findAll({
            include: [
                {
                    model: StaffProfile,
                    as: 'staff',
                    include: [{ model: User, as: 'user', attributes: ['name'] }]
                }
            ],
            order: [['paymentDate', 'DESC']]
        });
        res.json({ code: "SUCCESS_FETCH_ALL_STAFF_PAYMENTS", payments });
    } catch (error) {
        console.error("Error al obtener pagos de staff:", error);
        res.status(500).json({ code: "ERR_FETCH_STAFF_PAYMENTS" });
    }
};

export {
    getFinanceDashboard,
    getAllStaffPayments
};
