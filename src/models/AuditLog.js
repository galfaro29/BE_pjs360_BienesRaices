import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo de Auditoría (Audit Logs).
     * Registra cambios detallados en las entidades del sistema.
     */
    const AuditLog = sequelize.define(
        'AuditLog',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            entityName: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            entityId: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER, // Ajustado a INTEGER para coincidir con User.id
                allowNull: true,
                comment: 'ID del usuario que realizó la acción'
            },
            action: {
                type: DataTypes.ENUM(
                    'INSERT',
                    'UPDATE',
                    'DELETE',
                    'SOFT_DELETE',
                    'RESTORE'
                ),
                allowNull: false
            },
            oldValues: {
                type: DataTypes.JSONB,
                allowNull: true
            },
            newValues: {
                type: DataTypes.JSONB,
                allowNull: true
            },
            source: {
                type: DataTypes.ENUM('USER', 'ADMIN', 'AGENT', 'SYSTEM'),
                defaultValue: 'SYSTEM'
            },
            reason: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            ipAddress: {
                type: DataTypes.STRING(45),
                allowNull: true
            },
            userAgent: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            tableName: 'AuditLogs',
            freezeTableName: true,
            timestamps: true,
            updatedAt: false,
            indexes: [
                { fields: ['entityName'] },
                { fields: ['entityId'] },
                { fields: ['userId'] },
                { fields: ['createdAt'] }
            ]
        }
    );

    return AuditLog;
};
