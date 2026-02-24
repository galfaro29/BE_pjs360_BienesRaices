'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Professional', 'countryCode', {
            type: Sequelize.STRING(5),
            allowNull: true,
            comment: "Código del país del profesional (referencia a Country.code)",
            references: {
                model: 'Country',
                key: 'code',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Professional', 'countryCode');
    }
};
