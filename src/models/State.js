import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo que representa un Estado, Departamento o Provincia.
     * Se relaciona con Country y contiene múltiples Cities.
     */
    const State = sequelize.define(
        'State',
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: 'Nombre del Estado/Provincia (ej. San José, Nuevo León)'
            },
        },
        {
            tableName: 'State',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return State;
};
