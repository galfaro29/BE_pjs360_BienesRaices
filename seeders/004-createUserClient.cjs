'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = '$2b$10$I92oJBIMNjwnhl04JqnIcu0wjSZ.CEa5eveRND1Z0fuXAJ6UeOzNG'; // Password123!
    const users = [];
    const clients = [];
    const now = new Date();

    // 1. Usuario principal (Gabito)
    const [gabitoExists] = await queryInterface.sequelize.query(
      `SELECT id FROM "User" WHERE email = 'gabriel.alfaro.cruz@gmail.com' LIMIT 1;`
    );

    if (gabitoExists.length === 0) {
      users.push({
        customId: 'PJS-CLI-2AGWC-250827',
        name: 'Gabito',
        email: 'gabriel.alfaro.cruz@gmail.com',
        password: passwordHash,
        token: null,
        confirmado: true,
        confirmedAt: now,
        role: 'client',
        isActive: true,
        locale: 'es',
        createdAt: now,
        updatedAt: now
      });
    }

    // 2. Usuarios adicionales (correo1 a correo10)
    for (let i = 1; i <= 10; i++) {
      const email = `correo${i}@pjs360.com`;
      const [exists] = await queryInterface.sequelize.query(
        `SELECT id FROM "User" WHERE email = '${email}' LIMIT 1;`
      );

      if (exists.length === 0) {
        users.push({
          customId: `PJS-CLI-FAKE-${1000 + i}`,
          name: `Usuario ${i}`,
          email: email,
          password: passwordHash,
          token: null,
          confirmado: true,
          confirmedAt: now,
          role: 'client',
          isActive: true,
          locale: 'es',
          createdAt: now,
          updatedAt: now
        });
      }
    }

    // Insertar usuarios si hay nuevos
    if (users.length > 0) {
      await queryInterface.bulkInsert('User', users, {});
    }

    // 3. Crear registros en la tabla Client para todos estos usuarios
    const allEmails = ['gabriel.alfaro.cruz@gmail.com', ...Array.from({ length: 10 }, (_, i) => `correo${i + 1}@pjs360.com`)];

    for (const email of allEmails) {
      const [userRows] = await queryInterface.sequelize.query(
        `SELECT id FROM "User" WHERE email = '${email}' LIMIT 1;`
      );
      const userId = userRows && userRows[0] ? userRows[0].id : null;

      if (userId) {
        const [clientRows] = await queryInterface.sequelize.query(
          `SELECT "userId" FROM "Client" WHERE "userId" = ${userId} LIMIT 1;`
        );

        if (clientRows.length === 0) {
          clients.push({
            userId: userId,
            fullName: email === 'gabriel.alfaro.cruz@gmail.com' ? 'Gabriel Alfaro' : `Cliente Falso ${email.split('@')[0]}`,
            documentType: 'ID',
            preferredContact: 'WHATSAPP',
            categoryCode: 'C',
            marketingOptIn: false,
            createdAt: now,
            updatedAt: now
          });
        }
      }
    }

    if (clients.length > 0) {
      await queryInterface.bulkInsert('Client', clients, {});
    }
  },

  async down(queryInterface, Sequelize) {
    const emails = ['gabriel.alfaro.cruz@gmail.com', ...Array.from({ length: 10 }, (_, i) => `correo${i + 1}@pjs360.com`)];

    for (const email of emails) {
      const [userRows] = await queryInterface.sequelize.query(
        `SELECT id FROM "User" WHERE email = '${email}' LIMIT 1;`
      );
      const userId = userRows && userRows[0] ? userRows[0].id : null;

      if (userId) {
        await queryInterface.bulkDelete('Client', { userId }, {});
      }
    }

    await queryInterface.bulkDelete('User', {
      email: { [Sequelize.Op.in]: emails }
    }, {});
  }
};