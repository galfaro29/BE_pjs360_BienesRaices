'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('ProfessionalApplication', 'professionalTypeId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'ProfessionalType',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
            comment: 'Representa el tipo profesional base cuando el modelo es subscription'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('ProfessionalApplication', 'professionalTypeId');
    }
};
