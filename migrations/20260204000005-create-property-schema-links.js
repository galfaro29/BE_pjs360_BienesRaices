
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        const tableExists = await queryInterface.tableExists('PropertySchemaLinks');
        if (!tableExists) {
            await queryInterface.createTable('PropertySchemaLinks', {
                propertyTypeId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: 'PropertyTypes',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                detailModel: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                }
            });
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PropertySchemaLinks');
    }
};
