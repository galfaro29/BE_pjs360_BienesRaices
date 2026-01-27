'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const propertyTypes = [
            { name: 'Casa' },
            { name: 'Departamento' },
            { name: 'Terreno' },
            { name: 'Oficina' },
            { name: 'Bodega' },
            { name: 'Local Comercial' },
            { name: 'Consultorio' },
            { name: 'Quinta' },
            { name: 'Rancho' },
            { name: 'Hacienda' },
            { name: 'Edificio' },
        ];

        for (const type of propertyTypes) {
            await queryInterface.sequelize.query(
                `INSERT INTO "PropertyTypes" (name)
         SELECT :name
         WHERE NOT EXISTS (
           SELECT 1 FROM "PropertyTypes" WHERE name = :name
         )`,
                { replacements: type }
            );
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('PropertyTypes', null, {});
    }
};
