import { Request, Response, NextFunction } from 'express';
import { requestContext } from '../helpers/requestContext.js';
import { RequestContext } from '../types/helpers/requestContext.types.js';

/**
 * Middleware para capturar información del usuario autenticado
 * y guardarla en el contexto global de la solicitud.
 */
const contextMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Obtenemos el ID del usuario de req.user (asumiendo que viene de un middleware de Auth previo)
    // @ts-ignore - req.user puede no estar tipado en la interfaz base de Express
    const userId = req.user?.id || null;
    const ipAddress = req.ip || req.connection.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    const context: RequestContext = {
        userId,
        ipAddress,
        userAgent,
        source: (req.headers['x-source'] as string) || 'USER'
    };

    requestContext.run(context, () => next());
};

export default contextMiddleware;
