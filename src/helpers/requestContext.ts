import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from '../types/helpers/requestContext.types.js';

/**
 * Almacenamiento local asíncrono para mantener el contexto de la solicitud
 * (como el ID del usuario) a través de llamadas asíncronas sin pasarlo por parámetros.
 */
export const requestContext = new AsyncLocalStorage<RequestContext>();
