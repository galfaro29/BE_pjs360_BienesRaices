'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Definir el mapeo TypeName -> DetailModel
        const typeMapping = {
            'Casa': 'PropertyResidentialDetail',
            'Departamento': 'PropertyResidentialDetail',
            'Quinta': 'PropertyResidentialDetail',
            'Rancho': 'PropertyResidentialDetail',
            'Hacienda': 'PropertyResidentialDetail',
            'Terreno': 'PropertyLandDetail',
            'Oficina': 'PropertyOfficeDetail',
            'Consultorio': 'PropertyOfficeDetail',
            'Bodega': 'PropertyCommercialDetail',
            'Local Comercial': 'PropertyCommercialDetail',
            'Edificio': 'PropertyBuildingDetail',
        };

        // 2. Obtener todos los propertyTypes de la BD
        const propertyTypes = await queryInterface.sequelize.query(
            `SELECT id, name FROM "PropertyTypes";`,
            { type: queryInterface.sequelize.QueryTypes.SELECT }
        );

        // 3. Construir el array de inserción
        const dataToInsert = [];

        for (const type of propertyTypes) {
            const detailModel = typeMapping[type.name];
            if (detailModel) {
                dataToInsert.push({
                    propertyTypeId: type.id,
                    detailModel: detailModel
                });
            }
        }

        // 4. Insertar usando onConflict para evitar duplicados (upsert)
        // Nota: Como no tenemos timestamps en este modelo, es inserción directa.
        // Usamos un bucle con verificación simple o bulkInsert si está limpio.
        // Para robustez, haremos un insert con WHERE NOT EXISTS uno por uno, o un bulkDelete previo si es safe.
        // Aquí usaremos la estrategia segura de loop + insert if not exists.

        for (const item of dataToInsert) {
            await queryInterface.sequelize.query(
                `INSERT INTO "PropertySchemaControls" ("propertyTypeId", "detailModel")
         SELECT :propertyTypeId, :detailModel
         WHERE NOT EXISTS (
           SELECT 1 FROM "PropertySchemaControls" WHERE "propertyTypeId" = :propertyTypeId
         )`,
                {
                    replacements: {
                        propertyTypeId: item.propertyTypeId,
                        detailModel: item.detailModel
                    }
                }
            );
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('PropertySchemaControls', null, {});
    }
};
