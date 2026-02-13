'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('ProfessionalType', [
            {
                id: 1,
                name: 'Agente inmobiliario',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                name: 'Abogado inmobiliario',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                name: 'Notario',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                name: 'Tasador / Valuador',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                name: 'Topógrafo',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                name: 'Fotógrafo inmobiliario',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'seller',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                name: 'Arquitecto',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                name: 'Desarrollador / Constructora',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'seller',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                name: 'Asesor hipotecario',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'buyer',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                name: 'Home staging / Interiorista',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'seller',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 11,
                name: 'Empresa de mudanza',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 12,
                name: 'Limpieza / mantenimiento',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 13,
                name: 'Inspector técnico (inspección de vivienda)',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'buyer',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 14,
                name: 'Seguros de hogar',
                status: true,
                engagementModel: 'subscription',
                applicableTo: 'both',
                created_at: new Date(),
                updated_at: new Date()
            },
        ], { ignoreDuplicates: true });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ProfessionalType', null, {});
    }
};
