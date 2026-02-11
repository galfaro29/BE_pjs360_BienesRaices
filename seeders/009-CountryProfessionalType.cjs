'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const seeds = [
            // Costa Rica (CR) - Soporta casi todo
            { countryCode: 'CR', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 2, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 3, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 4, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 5, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 6, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 7, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 8, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 9, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CR', professionalTypeId: 10, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // México (MX) - Algunos deshabilitados o restringidos
            { countryCode: 'MX', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'MX', professionalTypeId: 2, isEnabled: true, allowRegister: true, allowBusiness: false, created_at: now, updated_at: now },
            { countryCode: 'MX', professionalTypeId: 3, isEnabled: true, allowRegister: false, allowBusiness: false, created_at: now, updated_at: now },
            { countryCode: 'MX', professionalTypeId: 4, isEnabled: false, allowRegister: false, allowBusiness: false, created_at: now, updated_at: now },
            { countryCode: 'MX', professionalTypeId: 8, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Estados Unidos (US) - Solo lo principal
            { countryCode: 'US', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'US', professionalTypeId: 2, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'US', professionalTypeId: 9, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Colombia (CO)
            { countryCode: 'CO', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CO', professionalTypeId: 4, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CO', professionalTypeId: 5, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Argentina (AR)
            { countryCode: 'AR', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'AR', professionalTypeId: 6, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'AR', professionalTypeId: 10, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Perú (PE)
            { countryCode: 'PE', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'PE', professionalTypeId: 2, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Chile (CL)
            { countryCode: 'CL', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'CL', professionalTypeId: 7, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Guatemala (GT)
            { countryCode: 'GT', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'GT', professionalTypeId: 3, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Honduras (HN)
            { countryCode: 'HN', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },

            // Nicaragua (NI)
            { countryCode: 'NI', professionalTypeId: 1, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
            { countryCode: 'NI', professionalTypeId: 5, isEnabled: true, allowRegister: true, allowBusiness: true, created_at: now, updated_at: now },
        ];

        await queryInterface.bulkInsert('CountryProfessionalType', seeds, { ignoreDuplicates: true });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('CountryProfessionalType', null, {});
    }
};
