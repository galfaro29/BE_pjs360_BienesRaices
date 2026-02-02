import { Sequelize, Model, ModelStatic } from 'sequelize';
import { requestContext } from './requestContext.js';
import { RequestContext } from '../types/helpers/requestContext.types.js';

/**
 * Lista de modelos que requieren auditoría obligatoria.
 */
const AUDIT_MODELS: string[] = [
    'Property',
    'User',
    'Client',
    'Professional',
    'Payment',
    'Deposit',
    'PropertyPublication',
    'AgentSubscription',
    'ClientSubscription'
];

/**
 * Agrega hooks de auditoría automáticos a un modelo de Sequelize.
 * 
 * @param {ModelStatic<Model>} Model - El modelo al que se le aplicarán los hooks.
 * @param {Sequelize} sequelize - Instancia de Sequelize.
 */
export default function addAuditHooks(Model: ModelStatic<Model>, sequelize: Sequelize): void {
    // Si el modelo no está en la lista de auditoría, lo ignoramos.
    if (!AUDIT_MODELS.includes(Model.name)) {
        return;
    }

    const AuditLog = sequelize.models.AuditLog;

    if (!AuditLog) {
        console.warn(`⚠️ AuditLog model not found in sequelize instance when processing ${Model.name}`);
        return;
    }

    /**
     * Obtiene el contexto actual de la solicitud desde AsyncLocalStorage.
     */
    const getContext = (): RequestContext => {
        const store = requestContext.getStore();
        return store || {
            userId: null,
            ipAddress: null,
            userAgent: null,
            source: 'SYSTEM'
        };
    };

    // Hook: Después de Crear
    Model.afterCreate(async (instance: any, options: any) => {
        const context = getContext();
        await (AuditLog as any).create({
            entityName: Model.name,
            entityId: instance[Model.primaryKeyAttribute as string] || instance.id,
            action: 'INSERT',
            userId: context.userId,
            newValues: instance.get({ plain: true }),
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            source: context.source
        });
    });

    // Hook: Después de Actualizar
    Model.afterUpdate(async (instance: any, options: any) => {
        const context = getContext();
        await (AuditLog as any).create({
            entityName: Model.name,
            entityId: instance[Model.primaryKeyAttribute as string] || instance.id,
            action: 'UPDATE',
            oldValues: instance._previousDataValues,
            newValues: instance.get({ plain: true }),
            userId: context.userId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            source: context.source
        });
    });

    // Hook: Después de Eliminar (incluye soft delete si se usa)
    Model.afterDestroy(async (instance: any, options: any) => {
        const context = getContext();
        // @ts-ignore
        const isSoftDelete = options.truncate === undefined && instance.constructor.options.paranoid && instance.deletedAt;

        await (AuditLog as any).create({
            entityName: Model.name,
            entityId: instance[Model.primaryKeyAttribute as string] || instance.id,
            action: isSoftDelete ? 'SOFT_DELETE' : 'DELETE',
            userId: context.userId,
            oldValues: instance.get({ plain: true }),
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            source: context.source
        });
    });

    // Hook: Después de Restaurar
    // @ts-ignore
    Model.afterRestore(async (instance: any, options: any) => {
        const context = getContext();
        await (AuditLog as any).create({
            entityName: Model.name,
            entityId: instance[Model.primaryKeyAttribute as string] || instance.id,
            action: 'RESTORE',
            newValues: instance.get({ plain: true }),
            userId: context.userId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            source: context.source
        });
    });

    console.log(`✅ Audit hooks attached to: ${Model.name}`);
}
