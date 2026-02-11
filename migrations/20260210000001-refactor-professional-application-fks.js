'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Add the new column
        await queryInterface.addColumn('ProfessionalApplication', 'countryProfessionalTypeId', {
            type: Sequelize.INTEGER,
            allowNull: true, // Initially true to allow migration of data if needed, or to simplify the process
            references: {
                model: 'CountryProfessionalType',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            comment: 'Relación con la configuración de tipo profesional por país (FK a CountryProfessionalType.id)'
        });

        // Note: If this were a production system with data, we would write logic here to 
        // populate countryProfessionalTypeId based on existing countryCode and professionalTypeId.

        // 2. Remove the old columns
        await queryInterface.removeColumn('ProfessionalApplication', 'professionalTypeId');
        await queryInterface.removeColumn('ProfessionalApplication', 'countryCode');

        // 3. Make the new column NOT NULL after removal (optional, but good for integrity)
        // We do it in a separate step if we had data to populate. 
        // Since we are refactoring, we'll just set it to NOT NULL.
        await queryInterface.changeColumn('ProfessionalApplication', 'countryProfessionalTypeId', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('ProfessionalApplication', 'professionalTypeId', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
        await queryInterface.addColumn('ProfessionalApplication', 'countryCode', {
            type: Sequelize.STRING(5),
            allowNull: false
        });
        await queryInterface.removeColumn('ProfessionalApplication', 'countryProfessionalTypeId');
    }
};
