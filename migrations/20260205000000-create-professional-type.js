'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ProfessionalType', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                comment: 'Identificador único del tipo de profesional (PK)'
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                comment: "Nombre legible del tipo de profesional (ej: 'Agente Inmobiliario', 'Valuador')"
            },
            status: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si actualmente hay plazas abiertas para este tipo de profesional (true / false)'
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                comment: 'Fecha y hora de creación del tipo de profesional'
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                comment: 'Fecha y hora de la última actualización'
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('ProfessionalType');
    }
};
