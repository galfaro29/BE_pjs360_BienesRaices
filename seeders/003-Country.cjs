'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const countries = [
      { code: 'CR', name: 'Costa Rica', currency: 'CRC', currencySymbol: '₡', status: true, allowRegister: true, allowBusiness: true },
      { code: 'US', name: 'United States', currency: 'USD', currencySymbol: '$', status: true, allowRegister: true, allowBusiness: false },
      { code: 'MX', name: 'Mexico', currency: 'MXN', currencySymbol: '$', status: true, allowRegister: true, allowBusiness: false },
      { code: 'CO', name: 'Colombia', currency: 'COP', currencySymbol: '$', status: false, allowRegister: true, allowBusiness: false },
      { code: 'AR', name: 'Argentina', currency: 'ARS', currencySymbol: '$', status: false, allowRegister: true, allowBusiness: false },
      { code: 'PE', name: 'Peru', currency: 'PEN', currencySymbol: 'S/.', status: false, allowRegister: true, allowBusiness: false },
      { code: 'VE', name: 'Venezuela', currency: 'VES', currencySymbol: 'Bs.', status: false, allowRegister: true, allowBusiness: false },
      { code: 'BR', name: 'Brazil', currency: 'BRL', currencySymbol: 'R$', status: false, allowRegister: true, allowBusiness: false },
      { code: 'CL', name: 'Chile', currency: 'CLP', currencySymbol: '$', status: false, allowRegister: true, allowBusiness: false },
      { code: 'GT', name: 'Guatemala', currency: 'GTQ', currencySymbol: 'Q', status: false, allowRegister: true, allowBusiness: false },
      { code: 'HN', name: 'Honduras', currency: 'HNL', currencySymbol: 'L', status: false, allowRegister: true, allowBusiness: false },
      { code: 'NI', name: 'Nicaragua', currency: 'NIO', currencySymbol: 'C$', status: false, allowRegister: true, allowBusiness: false },
    ];

    for (const country of countries) {
      await queryInterface.sequelize.query(
        `INSERT INTO "Country" (code, name, currency, "currencySymbol", "status", "allowRegister", "allowBusiness")
         VALUES (:code, :name, :currency, :currencySymbol, :status, :allowRegister, :allowBusiness)
         ON CONFLICT (code) DO UPDATE SET 
            name = EXCLUDED.name,
            currency = EXCLUDED.currency,
            "currencySymbol" = EXCLUDED."currencySymbol",
            "status" = EXCLUDED."status",
            "allowRegister" = EXCLUDED."allowRegister",
            "allowBusiness" = EXCLUDED."allowBusiness"`,
        { replacements: country }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Country', null, {});
  }
};