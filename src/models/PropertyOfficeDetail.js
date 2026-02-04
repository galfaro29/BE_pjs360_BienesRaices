import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const PropertyOfficeDetail = sequelize.define(
        'PropertyOfficeDetail',
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
            workstations: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Número de estaciones de trabajo'
            },
            meetingRooms: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Número de salas de reuniones'
            },
            parking: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Espacios de estacionamiento'
            }
        },
        {
            tableName: 'PropertyOfficeDetail',
            freezeTableName: true,
            timestamps: false
        }
    );

    return PropertyOfficeDetail;
};
