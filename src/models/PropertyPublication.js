import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo de Publicaciones de Propiedades.
     * Gestiona el tipo de visibilidad, prioridad y vigencia de una propiedad en el portal,
     * vinculándola opcionalmente a una suscripción de cliente o profesional.
     */
    const PropertyPublication = sequelize.define(
        'PropertyPublication',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                comment: 'Identificador único de la publicación'
            },
            propertyId: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: 'ID de la propiedad publicada'
            },
            publicationType: {
                type: DataTypes.ENUM('LIBRE', 'DESTACADA', 'PLUS', 'PROFESSIONAL'),
                allowNull: false,
                defaultValue: 'LIBRE'
            },
            clientPricingModelId: {
                type: DataTypes.UUID,
                allowNull: true,
                comment: 'Vínculo opcional con plan de precio de cliente'
            },
            professionalPricingModelId: {
                type: DataTypes.UUID,
                allowNull: true,
                comment: 'Vínculo opcional con plan de precio profesional'
            },
            status: {
                type: DataTypes.ENUM('ACTIVA', 'INACTIVA', 'EXPIRADA'),
                allowNull: false,
                defaultValue: 'ACTIVA'
            },
            priority: {
                type: DataTypes.ENUM('BAJA', 'MEDIA', 'ALTA'),
                allowNull: false,
                defaultValue: 'BAJA'
            },
            startsAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW
            },
            endsAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: 'PropertyPublication',
            freezeTableName: true,
            timestamps: true,
        }
    );

    return PropertyPublication;
};
