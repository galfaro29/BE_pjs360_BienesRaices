'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const [results] = await queryInterface.sequelize.query(
      `SELECT id FROM "User" WHERE email = 'kemuel.alfaro.picado@gmail.com' LIMIT 1;`
    );

    if (results.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Jalfaro2012', salt);

      await queryInterface.bulkInsert('"User"', [{
        customId: 'PJS-ADM1',   // 👈 Genera un valor único
        name: 'Kemuel',
        email: 'kemuel.alfaro.picado@gmail.com',
        password: hashedPassword,
        token: null,
        confirmado: true,
        role: 'admin',
        isActive: true,
        locale: 'es',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('"User"', { email: 'kemuel.alfaro.picado@gmail.com' }, {});
  }
};
