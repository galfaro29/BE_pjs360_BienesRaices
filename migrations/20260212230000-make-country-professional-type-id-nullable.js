'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('ProfessionalApplication', 'countryProfessionalTypeId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Relación con la configuración de tipo profesional por país (FK a CountryProfessionalType.id)'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('ProfessionalApplication', 'countryProfessionalTypeId', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
    }
};
