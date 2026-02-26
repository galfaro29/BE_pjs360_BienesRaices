'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const passwordHash = '$2b$10$I92oJBIMNjwnhl04JqnIcu0wjSZ.CEa5eveRND1Z0fuXAJ6UeOzNG'; // Password123!
        const now = new Date();
        const users = [];
        const professionals = [];

        // 1. Crear 10 usuarios con rol 'professional'
        for (let i = 1; i <= 10; i++) {
            const email = `profe${i}@pjs360.com`;

            // Verificar si el usuario ya existe
            const [exists] = await queryInterface.sequelize.query(
                `SELECT id FROM "User" WHERE email = '${email}' LIMIT 1;`
            );

            if (exists.length === 0) {
                users.push({
                    customId: `PJS-PRO-FAKE-${2000 + i}`,
                    name: `Profe ${i}`,
                    email: email,
                    password: passwordHash,
                    token: null,
                    confirmado: true,
                    confirmedAt: now,
                    role: 'professional',
                    isActive: true,
                    locale: 'es',
                    countryCode: 'CR', // 🟢 Se define aquí ahora
                    createdAt: now,
                    updatedAt: now
                });
            }
        }

        if (users.length > 0) {
            await queryInterface.bulkInsert('User', users, {});
        }

        // 2. Crear registros en la tabla Professional para estos usuarios
        for (let i = 1; i <= 10; i++) {
            const email = `profe${i}@pjs360.com`;
            const [userRows] = await queryInterface.sequelize.query(
                `SELECT id FROM "User" WHERE email = '${email}' LIMIT 1;`
            );
            const userId = userRows && userRows[0] ? userRows[0].id : null;

            if (userId) {
                // Verificar si el profesional ya existe
                const [profExists] = await queryInterface.sequelize.query(
                    `SELECT id FROM "Professional" WHERE "userId" = ${userId} LIMIT 1;`
                );

                if (profExists.length === 0) {
                    professionals.push({
                        userId: userId,
                        engagementModel: i <= 3 ? 'commission' : 'subscription',
                        // 🔴 countryCode eliminado de aquí
                        professionalTypeId: 1, // 'Agente inmobiliario' según seeder 008
                        status: 'active_verified',
                        firstName: 'Profe',
                        lastName: `${i} Falso`,
                        phone: `8888${i.toString().padStart(4, '0')}`,
                        bio: `Bio de prueba para el profesional ${i}. Experto en el sector inmobiliario.`,
                        address: 'San José, Costa Rica',
                        available: true,
                        hasVehicle: true,
                        vehicleType: 'car',
                        canTravel: true,
                        createdAt: now,
                        updatedAt: now
                    });
                }
            }
        }

        if (professionals.length > 0) {
            await queryInterface.bulkInsert('Professional', professionals, {});
        }
    },

    async down(queryInterface, Sequelize) {
        const emails = Array.from({ length: 10 }, (_, i) => `profe${i + 1}@pjs360.com`);

        // Obtener IDs de usuarios para borrar registros relacionados en Professional
        const [userRows] = await queryInterface.sequelize.query(
            `SELECT id FROM "User" WHERE email IN (${emails.map(e => `'${e}'`).join(',')});`
        );
        const userIds = userRows.map(row => row.id);

        if (userIds.length > 0) {
            await queryInterface.bulkDelete('Professional', { userId: { [Sequelize.Op.in]: userIds } }, {});
        }

        await queryInterface.bulkDelete('User', {
            email: { [Sequelize.Op.in]: emails }
        }, {});
    }
};
