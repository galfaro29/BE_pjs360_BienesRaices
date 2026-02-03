import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const PropertyResidentialDetail = sequelize.define(
        'PropertyResidentialDetail',
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
            bedrooms: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Número de habitaciones'
            },
            bathrooms: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Número de baños completos'
            },
            parking: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Espacios de estacionamiento'
            },
            constructionSize: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Superficie construida en m²'
            },
            plotSize: {
                type: DataTypes.FLOAT,
                allowNull: true,
                comment: 'Superficie total del terreno en m²'
            }
        },
        {
            tableName: 'PropertyResidentialDetails',
            freezeTableName: true,
            timestamps: false
        }
    );

    return PropertyResidentialDetail;
};
