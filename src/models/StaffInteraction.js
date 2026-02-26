import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo StaffInteraction.
     * Registra las interacciones (tickets, chats, llamadas) entre clientes/profesionales
     * y el personal interno (staff).
     */
    const StaffInteraction = sequelize.define(
        'StaffInteraction',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                comment: 'Identificador único de la interacción',
            },

            staffId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del perfil de staff que atiende la interacción',
                references: {
                    model: 'StaffProfile',
                    key: 'userId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            clientId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'ID del cliente involucrado (si aplica)',
                references: {
                    model: 'Client',
                    key: 'userId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },

            professionalId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: 'ID del profesional involucrado (si aplica)',
                references: {
                    model: 'Professional',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },

            interactionType: {
                type: DataTypes.ENUM('chat', 'ticket', 'call'),
                allowNull: false,
                defaultValue: 'ticket',
                //comment: 'Tipo de medio de la interacción (chat, ticket, call)',
            },

            status: {
                type: DataTypes.ENUM('open', 'closed'),
                allowNull: false,
                defaultValue: 'open',
                //comment: 'Estado actual de la interacción (open, closed)',
            },

            closedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: 'Fecha y hora en que se cerró la interacción',
            },
        },
        {
            tableName: 'StaffInteraction',
            freezeTableName: true,
            timestamps: true,
            comment: 'Interacciones entre usuarios y el personal administrativo',
        }
    );

    return StaffInteraction;
};
