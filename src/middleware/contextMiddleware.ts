import { Request, Response, NextFunction } from 'express';
import { requestContext } from '../helpers/requestContext.js';
import { RequestContext } from '../types/helpers/requestContext.types.js';

/**
 * Middleware para capturar información del usuario autenticado
 * y guardarla en el contexto global de la solicitud.
 */
const contextMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Obtenemos el ID del usuario de req.user (preferiblemente customId)
    // @ts-ignore
    const userId = req.user?.customId || req.user?.id || null;

    // Captura de IP más robusta (detrás de proxies, etc.)
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.ip ||
        req.socket.remoteAddress ||
        null;

    const userAgent = req.headers['user-agent'] || null;
    const source = (req.headers['x-source'] as string) || 'USER';

    const context: RequestContext = {
        userId,
        ipAddress,
        userAgent,
        source
    };

    // Log para depuración
    //console.log(`🌐 [contextMiddleware] Zone START: id=${userId}, ip=${ipAddress}, url=${req.url}`);

    requestContext.run(context, () => {
        next();
    });
};

/**
 * Middleware para asegurar que el contexto exista. 
 * Útil para re-enlazar el contexto después de middlewares que rompen la cadena asíncrona (como multer).
 */
export const ensureRequestContext = (req: Request, res: Response, next: NextFunction): void => {
    const store = requestContext.getStore();

    if (store) {
        return next();
    }

    // Si no hay store, lo reconstruimos a partir de la request actual
    // @ts-ignore
    const userId = req.user?.customId || req.user?.id || null;
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.ip ||
        req.socket.remoteAddress ||
        null;
    const userAgent = req.headers['user-agent'] || null;
    const source = (req.headers['x-source'] as string) || 'USER';

    const context: RequestContext = {
        userId,
        ipAddress,
        userAgent,
        source
    };

    console.log(`🔧 [ensureRequestContext] Re-binding context for: id=${userId}, url=${req.url}`);

    requestContext.run(context, () => {
        next();
    });
};

export default contextMiddleware;
