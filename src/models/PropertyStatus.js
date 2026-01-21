import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Catálogo de Estatus de Propiedad.
     * Ejemplos: Venta, Renta, Venta/Renta.
     */
    const PropertyStatus = sequelize.define(
        'PropertyStatus',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'Estado de la oferta (ej. Venta, Alquiler)'
            },
        },
        {
            tableName: 'PropertyStatuses',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return PropertyStatus;
};
