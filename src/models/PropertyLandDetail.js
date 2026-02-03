import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const PropertyLandDetail = sequelize.define(
        'PropertyLandDetail',
        {
            propertyId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Properties',
                    key: 'id'
                }
            },
            landArea: {
                type: DataTypes.FLOAT,
                allowNull: false,
                comment: 'Área del terreno en metros cuadrados'
            },
            frontMeters: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Metros de frente'
            },
            depthMeters: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Metros de fondo'
            },
            landUse: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: 'Uso de suelo (Residencial, Comercial, Mixto, etc.)'
            }
        },
        {
            tableName: 'PropertyLandDetails',
            freezeTableName: true,
            timestamps: false
        }
    );

    return PropertyLandDetail;
};
