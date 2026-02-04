import { DataTypes } from 'sequelize';
// ✔ Configurable por admin / manager
//✔ No depende de que exista una propiedad
//✔ Vive a nivel tipo, no propiedad
export default (sequelize) => {
    const PropertySchemaLink = sequelize.define(
        'PropertySchemaLink',
        {
            propertyTypeId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'PropertyType',
                    key: 'id'
                },
                comment: 'Tipo de propiedad al que aplica este esquema'
            },
            detailModel: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: 'Nombre del modelo Sequelize de detalles (ej. PropertyResidentialDetail)'
            }
        },
        {
            tableName: 'PropertySchemaLink',
            timestamps: false
        }
    );

    return PropertySchemaLink;
};
