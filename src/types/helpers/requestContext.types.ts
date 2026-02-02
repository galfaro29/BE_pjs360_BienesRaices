export interface RequestContext {
    userId: string | number | null;
    ipAddress: string | null;
    userAgent: string | null;
    source: string;
}
