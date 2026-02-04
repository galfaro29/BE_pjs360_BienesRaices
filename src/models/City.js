import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo que representa una Ciudad o Cantón.
     * Pertenece a un State y es la ubicación base de una Property.
     */
    const City = sequelize.define(
        'City',
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: 'Nombre de la Ciudad (ej. Escazú, Monterrey)'
            },
        },
        {
            tableName: 'City',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return City;
};
