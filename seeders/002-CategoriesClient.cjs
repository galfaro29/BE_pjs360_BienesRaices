'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      { code: 'A', name: 'Excellent' },
      { code: 'B', name: 'Very Good' },
      { code: 'C', name: 'New' },
      { code: 'D', name: 'Regular' },
      { code: 'F', name: 'Poor' },
    ];

    for (const category of categories) {
      await queryInterface.sequelize.query(
        `INSERT INTO "CategoriesClient" (code, name)
         VALUES (:code, :name)
         ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name`,
        { replacements: category }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategoriesClient', null, {});
  }
};