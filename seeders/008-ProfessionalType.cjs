'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('ProfessionalType', [
            {
                id: 1,
                name: 'Agente Inmobiliario',
                status: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                name: 'Abogado Inmobiliario',
                status: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                name: 'Valuador',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                name: 'Arquitecto',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                name: 'Constructor / Contratista',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                name: 'Inspector de Propiedades',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                name: 'Administrador de Propiedades',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                name: 'Fotógrafo Inmobiliario',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                name: 'Asesor Hipotecario',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                name: 'Servicios Complementarios',
                status: false,
                created_at: new Date(),
                updated_at: new Date()
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ProfessionalType', null, {});
    }
};
