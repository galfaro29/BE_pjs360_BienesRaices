import { Sequelize, Model } from 'sequelize';

export interface AuditLogAttributes {
    id?: string;
    entityName: string;
    entityId: string;
    userId: number | null;
    action: 'INSERT' | 'UPDATE' | 'DELETE' | 'SOFT_DELETE' | 'RESTORE';
    oldValues?: any;
    newValues?: any;
    source: string;
    ipAddress?: string | null;
    userAgent?: string | null;
}

export type AddAuditHooks = (Model: any, sequelize: Sequelize) => void;
