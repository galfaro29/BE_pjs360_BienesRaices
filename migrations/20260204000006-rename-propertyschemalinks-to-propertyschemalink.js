
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.renameTable('PropertySchemaLinks', 'PropertySchemaLink');
        } catch (error) {
            console.log('Table PropertySchemaLinks might not exist or PropertySchemaLink already exists:', error.message);
        }
    },

    async down(queryInterface, Sequelize) {
        try {
            await queryInterface.renameTable('PropertySchemaLink', 'PropertySchemaLinks');
        } catch (error) {
            console.log('Revert failed:', error.message);
        }
    }
};
