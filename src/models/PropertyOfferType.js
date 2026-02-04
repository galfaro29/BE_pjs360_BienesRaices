import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Catálogo de Tipos de Oferta (antes PropertyStatus).
     * Ejemplos: Venta, Alquiler, Venta/Alquiler.
     */
    const PropertyOfferType = sequelize.define(
        'PropertyOfferType',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'Tipo de oferta (ej. Venta, Alquiler)'
            },
        },
        {
            tableName: 'PropertyOfferType',
            freezeTableName: true,
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['name']
                }
            ]
        }
    );

    return PropertyOfferType;
};
