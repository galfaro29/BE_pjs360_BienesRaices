import { StaffProfile, StaffPayment, StaffPaymentInfo, StaffInteraction, StaffRating, User } from "../models/index.js";

/**
 * getManagerDashboard
 * — Devuelve datos del manager autenticado
 */
const getManagerDashboard = async (req: any, res: any) => {
    try {
        const managerProfile = await StaffProfile.findOne({
            where: { userId: req.user.id },
            include: [
                { model: StaffPaymentInfo, as: 'paymentInfo' },
                { model: StaffInteraction, as: 'interactions' }
            ]
        });

        res.json({
            code: "SUCCESS_MANAGER_DASHBOARD",
            user: req.user,
            profile: managerProfile
        });
    } catch (error) {
        console.error("Error al obtener dashboard de manager:", error);
        res.status(500).json({ code: "ERR_FETCH_MANAGER_DASHBOARD" });
    }
};

/**
 * getManagerProfile
 * — Obtiene el perfil completo del staff
 */
const getManagerProfile = async (req: any, res: any) => {
    try {
        const profile = await StaffProfile.findOne({
            where: { userId: req.user.id },
            include: [
                { model: StaffPaymentInfo, as: 'paymentInfo' },
                { model: User, as: 'user', attributes: ['name', 'email', 'customId'] }
            ]
        });

        if (!profile) {
            return res.status(404).json({ code: "ERR_STAFF_PROFILE_NOT_FOUND" });
        }

        res.json({ code: "SUCCESS_FETCH_STAFF_PROFILE", profile });
    } catch (error) {
        console.error("Error al obtener perfil de staff:", error);
        res.status(500).json({ code: "ERR_FETCH_STAFF_PROFILE" });
    }
};

export {
    getManagerDashboard,
    getManagerProfile
};
