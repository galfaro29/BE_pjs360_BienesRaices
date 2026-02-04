import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo de Suscripciones para Agentes/Profesionales.
     * Controla los límites de propiedades y clientes para agentes y agencias.
     */
    const AgentSubscription = sequelize.define(
        'AgentSubscription',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                comment: 'Identificador único de la suscripción de agente'
            },
            agentUserId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del usuario (profesional) dueño de la suscripción'
            },
            planType: {
                type: DataTypes.ENUM('AGENTE_PRO', 'AGENCIA'),
                defaultValue: 'AGENTE_PRO',
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('ACTIVA', 'EXPIRADA'),
                defaultValue: 'ACTIVA',
                allowNull: false
            },
            maxActiveProps: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'Límite máximo de propiedades activas'
            },
            maxClients: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'Límite máximo de clientes'
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
            tableName: 'AgentSubscription',
            freezeTableName: true,
            timestamps: true,
        }
    );

    return AgentSubscription;
};
