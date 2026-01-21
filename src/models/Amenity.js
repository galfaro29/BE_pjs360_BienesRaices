import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Catálogo de Amenidades o Características de una propiedad.
     * Ejemplos: Piscina, Gimnasio, Seguridad 24/7, Jardín, Aire Acondicionado.
     * Se relaciona N:M con Property.
     */
    const Amenity = sequelize.define(
        'Amenity',
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: 'Nombre de la amenidad (ej. Piscina, Patio)'
            },
            icon: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: 'Clase de icono o URL para mostrar en el frontend (opcional)'
            }
        },
        {
            tableName: 'Amenities',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Amenity;
};
