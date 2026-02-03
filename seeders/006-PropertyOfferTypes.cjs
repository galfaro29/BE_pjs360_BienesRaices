'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const offerTypes = [
            { name: 'Venta' },
            { name: 'Alquiler' },
            { name: 'Venta / Alquiler' },
        ];

        for (const type of offerTypes) {
            await queryInterface.sequelize.query(
                `INSERT INTO "PropertyOfferTypes" (name)
         SELECT :name
         WHERE NOT EXISTS (
           SELECT 1 FROM "PropertyOfferTypes" WHERE name = :name
         )`,
                { replacements: type }
            );
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('PropertyOfferTypes', null, {});
    }
};
