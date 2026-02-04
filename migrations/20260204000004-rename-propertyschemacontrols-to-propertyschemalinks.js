
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.renameTable('PropertySchemaControls', 'PropertySchemaLinks');
        } catch (error) {
            console.log('Table PropertySchemaControls might not exist or PropertySchemaLinks already exists:', error.message);
        }
    },

    async down(queryInterface, Sequelize) {
        try {
            await queryInterface.renameTable('PropertySchemaLinks', 'PropertySchemaControls');
        } catch (error) {
            console.log('Revert failed:', error.message);
        }
    }
};
