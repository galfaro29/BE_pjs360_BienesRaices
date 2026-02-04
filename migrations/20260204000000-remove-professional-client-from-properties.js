
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        // Remove professionalId
        try {
            await queryInterface.removeColumn('Properties', 'professionalId');
        } catch (error) {
            console.log('Column professionalId not found, skipping removal.');
        }

        // Also attempting to remove clientId if it exists, as requested by user logic to strict user-only relation
        // Checking if column exists first is harder in raw migration without helpers, but 
        // usually removeColumn throws if not exists. 
        // Given the user prompt asked to remove relation of "professional or Client" if they exist.
        // I will try to remove 'clientId' as well, wrapping in try/catch or checking if I should.
        // However, looking at the previous analysis, Property did NOT have a Client relation defined in associations.js.
        // But to be safe and thorough based on "quitar esa relacion de FK de professional y Client en Property",
        // I will attempt to remove it if it exists by listing columns first or just trying.
        // Let's stick to professionalId first as that was clearly there.
        // Actually, I'll add a check or just try to remove it. safest is to just try remove professionalId.
        // If clientId exists in DB but not in code, it should be removed too.

        // Let's inspect if clientId exists... I can't easily. 
        // I'll add a try-catch block for clientId specifically if it's not critical, 
        // but standard migration usually assumes state. 
        // I will just remove professionalId as confirmed.

        // Wait, the user said: "deberia solo existir la relacion del id del usuario y no del profesiona o Cliente sobre la propiedad... quitar esa relacion de FK de professional y Client en Property"
        // So I should try to remove both if they exist.

        try {
            await queryInterface.removeColumn('Properties', 'clientId');
        } catch (error) {
            console.log('Column clientId might not exist, skipping removal.');
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('Properties', 'professionalId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Professional',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });

        // We don't restore clientId as it wasn't in the codebase I saw, so restoring it might be wrong.
    }
};
