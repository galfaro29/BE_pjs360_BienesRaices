export interface RequestContext {
    userId: number | null;
    ipAddress: string | null;
    userAgent: string | null;
    source: string;
}
