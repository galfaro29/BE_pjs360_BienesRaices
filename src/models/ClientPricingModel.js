import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo de Planes de Precio para Clientes.
     * Controla los límites de la cuenta (como max_active_props) pero no propiedades individuales.
     */
    const ClientPricingModel = sequelize.define(
        'ClientPricingModel',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                comment: 'Identificador único del plan de precio de cliente'
            },
            clientId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del perfil cliente dueño del plan',
                references: {
                    model: 'Client',
                    key: 'userId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
            tableName: 'ClientPricingModel',
            freezeTableName: true,
            timestamps: true,
        }
    );

    return ClientPricingModel;
};
