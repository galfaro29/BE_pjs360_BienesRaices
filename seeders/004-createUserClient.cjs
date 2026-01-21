'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verifica si ya existe el usuario por email
    const [results] = await queryInterface.sequelize.query(
      `SELECT id FROM "User" WHERE email = 'gabriel.alfaro.cruz@gmail.com' LIMIT 1;`
    );

    if (results.length === 0) {
      // Inserta el usuario client
      await queryInterface.bulkInsert('"User"', [{
        customId: 'PJS-CLI-2AGWC-250827',
        name: 'Gabito',
        email: 'gabriel.alfaro.cruz@gmail.com',
        password: '$2b$10$I92oJBIMNjwnhl04JqnIcu0wjSZ.CEa5eveRND1Z0fuXAJ6UeOzNG',
        token: null,
        confirmado: true,
        confirmedAt: new Date('2025-08-27T15:21:02.878Z'),
        role: 'client',
        isActive: true,
        locale: 'es',
        countryCode: 'CR',
        createdAt: new Date('2025-08-27T15:20:47.952Z'),
        updatedAt: new Date('2025-08-27T15:21:02.878Z')
      }], {});
    }

    // Obtener el userId del usuario (recién creado o ya existente)
    const [userRows] = await queryInterface.sequelize.query(
      `SELECT id FROM "User" WHERE email = 'gabriel.alfaro.cruz@gmail.com' LIMIT 1;`
    );
    const userId = userRows && userRows[0] ? userRows[0].id : null;

    if (userId) {
      // Verificar si ya existe el Client para este userId
      const [clientRows] = await queryInterface.sequelize.query(
        `SELECT "userId" FROM "Client" WHERE "userId" = ${userId} LIMIT 1;`
      );

      if (clientRows.length === 0) {
        await queryInterface.bulkInsert('"Client"', [{
          userId: userId,
          fullName: null,
          birthDate: null,
          documentType: 'ID',
          documentNumber: null,
          phone: null,
          altPhone: null,
          preferredContact: 'WHATSAPP',
          categoryCode: 'C',
          address: null,
          administrativeAreaLevel1: null,
          administrativeAreaLevel2: null,
          city: null,
          postalCode: null,
          lat: null,
          lng: null,
          profileImage: null,
          marketingOptIn: false,
          bankName: null,
          accountNumber: null,
          accountHolder: null,
          createdAt: new Date('2025-08-27T15:20:48.021Z'),
          updatedAt: new Date('2025-08-27T15:20:48.021Z')
        }], {});
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // Buscar el userId por email
    const [userRows] = await queryInterface.sequelize.query(
      `SELECT id FROM "User" WHERE email = 'gabriel.alfaro.cruz@gmail.com' LIMIT 1;`
    );
    const userId = userRows && userRows[0] ? userRows[0].id : null;

    if (userId) {
      // Borrar primero el Client asociado
      await queryInterface.bulkDelete('Client', { userId }, {});
    }

    // Luego borrar el User
    await queryInterface.bulkDelete('User', { email: 'gabriel.alfaro.cruz@gmail.com' }, {});
  }
};