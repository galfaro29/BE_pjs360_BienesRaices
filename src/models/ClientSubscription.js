import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo de Suscripciones.
     * Controla los límites de la cuenta (como max_active_props) pero no propiedades individuales.
     */
    const ClientSubscription = sequelize.define(
        'ClientSubscription',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                comment: 'Identificador único de la suscripción de cliente'
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del usuario (cliente) dueño de la suscripción'
            },
            planType: {
                type: DataTypes.ENUM('PLUS', 'FREE'),
                defaultValue: 'PLUS',
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('ACTIVA', 'EXPIRADA', 'CANCELADA'),
                defaultValue: 'ACTIVA',
                allowNull: false
            },
            maxActiveProps: {
                type: DataTypes.INTEGER,
                defaultValue: 10,
                allowNull: false,
                comment: 'Límite máximo de propiedades activas simultáneas'
            },
            startedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
                comment: 'Fecha de inicio del periodo actual'
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: 'Fecha de expiración del periodo actual'
            },
        },
        {
            tableName: 'ClientSubscription',
            freezeTableName: true,
            timestamps: true,
        }
    );

    return ClientSubscription;
};
