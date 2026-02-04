import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const PropertyWarehouseDetail = sequelize.define(
        'PropertyWarehouseDetail',
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
            totalArea: {
                type: DataTypes.FLOAT,
                allowNull: false,
                comment: 'Área total en metros cuadrados'
            },
            storageArea: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Área de almacenamiento'
            },
            ceilingHeight: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Altura del techo en metros'
            },
            loadingDocks: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Número de muelles de carga'
            },
            officeArea: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Área de oficinas en metros cuadrados'
            }
        },
        {
            tableName: 'PropertyWarehouseDetail',
            freezeTableName: true,
            timestamps: false
        }
    );

    return PropertyWarehouseDetail;
};
