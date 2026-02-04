import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const PropertyBuildingDetail = sequelize.define(
        'PropertyBuildingDetail',
        {
            propertyId: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'Property',
                    key: 'id'
                }
            },
            totalFloors: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Número total de pisos'
            },
            totalUnits: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Número total de unidades'
            },
            totalArea: {
                type: DataTypes.FLOAT,
                allowNull: false,
                comment: 'Área total de construcción en metros cuadrados'
            },
            parkingSpaces: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Espacios de estacionamiento totales'
            },
            yearBuilt: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Año de construcción'
            }
        },
        {
            tableName: 'PropertyBuildingDetail',
            freezeTableName: true,
            timestamps: false
        }
    );

    return PropertyBuildingDetail;
};
