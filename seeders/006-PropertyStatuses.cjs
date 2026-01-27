'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const propertyStatuses = [
            { name: 'Venta' },
            { name: 'Alquiler' },
            { name: 'Venta / Alquiler' },
            { name: 'Disponible' },
            { name: 'Reservado' },
            { name: 'Vendido' },
            { name: 'Rentado' },
        ];

        for (const status of propertyStatuses) {
            await queryInterface.sequelize.query(
                `INSERT INTO "PropertyStatuses" (name)
         SELECT :name
         WHERE NOT EXISTS (
           SELECT 1 FROM "PropertyStatuses" WHERE name = :name
         )`,
                { replacements: status }
            );
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('PropertyStatuses', null, {});
    }
};
