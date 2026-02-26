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
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'ID incremental único del registro de auditoría'
            },
            entityName: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'Nombre de la tabla/modelo afectado (ej: User, Property, Client)'
            },
            entityId: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: 'ID del registro afectado en la tabla original (Primary Key)'
            },
            userId: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: 'ID personalizado (customId) del usuario que realizó la acción'
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
                allowNull: true,
                comment: 'Estado del registro antes del cambio (solo en UPDATE/DELETE)'
            },
            newValues: {
                type: DataTypes.JSONB,
                allowNull: true,
                comment: 'Estado del registro después del cambio (en INSERT/UPDATE/RESTORE)'
            },
            source: {
                type: DataTypes.ENUM('USER', 'ADMIN', 'PROFESSIONAL', 'SYSTEM'),
                defaultValue: 'SYSTEM'
            },
            reason: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: 'Motivo opcional del cambio (si se proporciona)'
            },
            ipAddress: {
                type: DataTypes.STRING(45),
                allowNull: true,
                comment: 'Dirección IP desde la que se realizó la petición'
            },
            userAgent: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: 'Información del navegador/dispositivo del usuario'
            }
        },
        {
            tableName: 'AuditLog',
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
