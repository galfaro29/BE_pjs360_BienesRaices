'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Add engagementModel to ProfessionalType
        await queryInterface.addColumn('ProfessionalType', 'engagementModel', {
            type: Sequelize.ENUM('commission', 'subscription', 'both'),
            allowNull: false,
            defaultValue: 'subscription',
            comment: 'Define si este tipo profesional trabaja por comisión, suscripción o ambos'
        });

        // Add engagementModel to ProfessionalApplication
        await queryInterface.addColumn('ProfessionalApplication', 'engagementModel', {
            type: Sequelize.ENUM('commission', 'subscription'),
            allowNull: false,
            defaultValue: 'subscription',
            comment: 'Modelo de contratación elegido por el profesional (comisión o suscripción)'
        }).catch(err => console.log('Column engagementModel might already exist in ProfessionalApplication'));

        // Add engagementModel to Professional
        await queryInterface.addColumn('Professional', 'engagementModel', {
            type: Sequelize.ENUM('commission', 'subscription'),
            allowNull: false,
            defaultValue: 'subscription',
            comment: 'Modelo de contratación del profesional'
        }).catch(err => console.log('Column engagementModel might already exist in Professional'));

        // Add applicableTo to ProfessionalType
        await queryInterface.addColumn('ProfessionalType', 'applicableTo', {
            type: Sequelize.ENUM('seller', 'buyer', 'both'),
            allowNull: false,
            defaultValue: 'both',
            comment: 'Define si este tipo profesional aplica para vendedor, comprador o ambos'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('ProfessionalType', 'engagementModel');
        await queryInterface.removeColumn('ProfessionalApplication', 'engagementModel').catch(() => { });
        await queryInterface.removeColumn('Professional', 'engagementModel').catch(() => { });

        await queryInterface.removeColumn('ProfessionalType', 'applicableTo');
    }
};
