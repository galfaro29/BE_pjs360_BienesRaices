
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.renameTable('PropertyAmenities', 'PropertyAmenityLink');
        } catch (error) {
            console.log('Table PropertyAmenities might not exist or PropertyAmenityLink already exists:', error.message);
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameTable('PropertyAmenityLink', 'PropertyAmenities');
    }
};
