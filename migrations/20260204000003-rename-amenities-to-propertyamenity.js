
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.renameTable('Amenities', 'PropertyAmenity');
        } catch (error) {
            console.log('Table Amenities might not exist or PropertyAmenity already exists:', error.message);
        }
    },

    async down(queryInterface, Sequelize) {
        try {
            await queryInterface.renameTable('PropertyAmenity', 'Amenities');
        } catch (error) {
            console.log('Revert failed:', error.message);
        }
    }
};
