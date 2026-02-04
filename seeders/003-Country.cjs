'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const countries = [
      { code: 'CR', name: 'Costa Rica' },
      { code: 'US', name: 'United States' },
      { code: 'MX', name: 'Mexico' },
      { code: 'CO', name: 'Colombia' },
      { code: 'AR', name: 'Argentina' },
      { code: 'PE', name: 'Peru' },
      { code: 'VE', name: 'Venezuela' },
      { code: 'BR', name: 'Brazil' },
      { code: 'CL', name: 'Chile' },
      { code: 'GT', name: 'Guatemala' },
      { code: 'HN', name: 'Honduras' },
      { code: 'NI', name: 'Nicaragua' },
     
    ];

    for (const country of countries) {
      await queryInterface.sequelize.query(
        `INSERT INTO "Countries" (code, name)
         VALUES (:code, :name)
         ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name`,
        { replacements: country }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};