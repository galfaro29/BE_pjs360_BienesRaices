'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CountryProfessionalType', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                comment: 'Identificador único de la configuración por país (PK)'
            },
            countryCode: {
                type: Sequelize.STRING(5),
                allowNull: false,
                comment: 'Código del país (FK -> Country.code)',
                references: {
                    model: 'Country',
                    key: 'code'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            professionalTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'ID del tipo de profesional (FK -> ProfessionalType.id)',
                references: {
                    model: 'ProfessionalType',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            isEnabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si este tipo de profesional está habilitado en este país'
            },
            allowRegister: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si se permite el registro para este tipo de profesional en este país'
            },
            allowBusiness: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si se permite realizar negocios para este tipo de profesional en este país'
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                comment: 'Fecha y hora de creación del registro'
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                comment: 'Fecha y hora de la última actualización'
            }
        });

        // Add unique constraint to prevent duplicate configurations for same country and type
        await queryInterface.addConstraint('CountryProfessionalType', {
            fields: ['countryCode', 'professionalTypeId'],
            type: 'unique',
            name: 'unique_country_professional_type'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('CountryProfessionalType');
    }
};
