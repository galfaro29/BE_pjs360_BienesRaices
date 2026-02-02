import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo principal de Propiedades (Inmuebles).
     * Contiene toda la información descriptiva, precios y ubicación de la propiedad.
     */
    const Property = sequelize.define(
        'Property',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                comment: 'Identificador único de la propiedad (UUID)'
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del usuario que creó la propiedad'
            },
            title: {
                type: DataTypes.STRING(150),
                allowNull: false,
                comment: 'Título del anuncio (ej. Hermosa casa en la playa)'
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: 'Descripción detallada de la propiedad'
            },
            price: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: false,
                comment: 'Precio de venta o renta'
            },
            currency: {
                type: DataTypes.ENUM('USD', 'CRC'),
                defaultValue: 'USD',
                allowNull: false
            },
            bedrooms: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'Número de habitaciones'
            },
            bathrooms: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'Número de baños completos'
            },
            parking: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'Espacios de estacionamiento'
            },
            plotSize: {
                type: DataTypes.FLOAT,
                allowNull: false,
                comment: 'Superficie total del terreno en m²'
            },
            constructionSize: {
                type: DataTypes.FLOAT,
                allowNull: false,
                comment: 'Superficie construida en m²'
            },
            address: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: 'Dirección exacta o referencia textual'
            },
            latitude: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: 'Coordenada Latitud para mapas'
            },
            longitude: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: 'Coordenada Longitud para mapas'
            },
            status: {
                type: DataTypes.ENUM(
                    'BORRADOR',
                    'ACTIVA',
                    'INACTIVA',
                    'ELIMINADA'
                ),
                defaultValue: 'BORRADOR',
                allowNull: false
            },
            viewsCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                comment: 'Cantidad de vistas'
            }
        },
        {
            tableName: 'Properties',
            freezeTableName: true,
            timestamps: true
        }
    );

    return Property;
};
