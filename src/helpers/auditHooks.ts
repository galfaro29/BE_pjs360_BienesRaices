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
    'ProfessionalPricingModel',
    'ClientPricingModel',
    'StaffProfile',
    'StaffPaymentInfo',
    'StaffPayment',
    'StaffInteraction',
    'StaffRating'
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
    const getContext = (source: string = 'HOOK'): RequestContext => {
        const store = requestContext.getStore();
        if (!store) {
            console.warn(`🔴 [${source}] MISSING RequestContext store for ${Model.name}`);
        } else {
            // console.log(`🟢 [${source}] Found store for ${Model.name}: userId=${store.userId}`);
        }
        return store || {
            userId: null,
            ipAddress: null,
            userAgent: null,
            source: 'SYSTEM'
        };
    };

    // Hook: Antes de Crear (Para capturar contexto)
    Model.beforeCreate(async (instance: any, options: any) => {
        options._auditContext = getContext('beforeCreate');
    });

    // Hook: Después de Crear
    Model.afterCreate(async (instance: any, options: any) => {
        // Evitamos duplicados si viene de un Upsert (Sequelize dispara afterCreate o afterUpdate internamente)
        if (options._isUpsert || options.type === 'UPSERT') return;

        const context = options._auditContext || getContext('afterCreate');
        // console.log(`✨ [afterCreate] Model=${Model.name}, userId=${context.userId}`);
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

    // Hook: Antes de Actualizar (Para capturar contexto)
    Model.beforeUpdate(async (instance: any, options: any) => {
        options._auditContext = getContext('beforeUpdate');
    });

    // Hook: Después de Actualizar
    Model.afterUpdate(async (instance: any, options: any) => {
        // Evitamos duplicados si viene de un Upsert
        if (options._isUpsert || options.type === 'UPSERT') return;

        const context = options._auditContext || getContext('afterUpdate');
        // console.log(`📝 [afterUpdate] Model=${Model.name}, userId=${context.userId}`);
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

    // Hook: Antes de Eliminar
    Model.beforeDestroy(async (instance: any, options: any) => {
        options._auditContext = getContext('beforeDestroy');
    });

    // Hook: Después de Eliminar (incluye soft delete si se usa)
    Model.afterDestroy(async (instance: any, options: any) => {
        const context = options._auditContext || getContext();
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

    // Hook: Antes de Restaurar
    // @ts-ignore
    Model.beforeRestore(async (instance: any, options: any) => {
        options._auditContext = getContext('beforeRestore');
    });

    // Hook: Después de Restaurar
    // @ts-ignore
    Model.afterRestore(async (instance: any, options: any) => {
        const context = options._auditContext || getContext();
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

    // Hook: Antes de Upsert (Para capturar datos y contexto)
    // @ts-ignore
    Model.beforeUpsert(async (values: any, options: any) => {
        const context = getContext('beforeUpsert');
        // console.log(`🔍 [beforeUpsert] Model=${Model.name}, userId=${context.userId}`);
        // Adjuntamos el contexto y los valores originales a las opciones para que afterUpsert los use
        options._auditContext = context;
        options._auditValues = { ...values };
        options._isUpsert = true; // Flag para evitar duplicados en afterUpdate/afterCreate
    });

    // Hook: Después de Upsert (Importante para actualizaciones de perfil)
    // @ts-ignore
    Model.afterUpsert(async (created: any, options: any) => {
        // Recuperamos el contexto capturado en beforeUpsert (más confiable)
        const context = options._auditContext || getContext('afterUpsert');
        const modelData = options._auditValues || options.modelData || options.attributes || {};

        // console.log(`🔄 [afterUpsert] Processing ${Model.name}: contextUserId=${context.userId}, source=${context.source}`);
        let entityId = 'UPSERT';

        if (options.where) {
            entityId = JSON.stringify(options.where);
        } else {
            // Buscamos llaves primarias comunes en modelData
            const pk = (Model.primaryKeyAttribute as string) || 'id';
            // Intentamos obtener el ID de varias formas comunes en upsert/modelData
            const val = modelData[pk] ||
                modelData.userId ||
                modelData.id ||
                modelData.customId ||
                (options.attributes && options.attributes[pk]);

            if (val) {
                entityId = val.toString();
            } else {
                entityId = `UPSERT-${Model.name}`; // Fallback más informativo
            }
        }

        await (AuditLog as any).create({
            entityName: Model.name,
            entityId: entityId.substring(0, 100),
            action: 'UPDATE',
            newValues: modelData,
            userId: context.userId,
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
            source: context.source
        });
    });

    //console.log(`✅ Audit hooks attached to: ${Model.name}`);
}
