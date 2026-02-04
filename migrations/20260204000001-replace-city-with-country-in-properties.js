
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        // 1. Remove cityId
        try {
            await queryInterface.removeColumn('Properties', 'cityId');
        } catch (error) {
            console.log('Column cityId not found, skipping removal.');
        }

        // 2. Add countryCode
        try {
            await queryInterface.addColumn('Properties', 'countryCode', {
                type: Sequelize.STRING(5),
                allowNull: true,
                references: {
                    model: 'Countries',
                    key: 'code',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            });
        } catch (error) {
            console.log('Column countryCode might already exist, skipping addition.');
        }
    },

    async down(queryInterface, Sequelize) {
        // Reverse operations

        // 1. Remove countryCode
        await queryInterface.removeColumn('Properties', 'countryCode');

        // 2. Add cityId back
        await queryInterface.addColumn('Properties', 'cityId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Cities', // Assuming table name is Cities based on model usage
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    }
};
