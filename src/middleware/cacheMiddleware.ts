/**
 * cacheMiddleware
 * ----------------
 * Este middleware implementa un sistema de cache en memoria para peticiones HTTP GET.
 *
 * ¿Qué hace?
 * - Intercepta únicamente solicitudes GET.
 * - Genera una clave única usando el método HTTP y la URL original.
 * - Si existe una respuesta previamente guardada en cache:
 *   → devuelve esa respuesta inmediatamente
 *   → evita ejecutar el controller
 * - Si NO existe cache:
 *   → deja pasar la petición
 *   → intercepta la respuesta (res.json)
 *   → guarda el resultado en memoria para futuras peticiones
 *
 * Beneficios:
 * - Reduce llamadas repetidas a la base de datos
 * - Mejora el tiempo de respuesta
 * - Disminuye carga del servidor
 *
 * Importante:
 * - El cache es temporal (TTL = 60 segundos)
 * - El cache se pierde si el servidor se reinicia
 * - No debe usarse para datos sensibles o altamente dinámicos
 */
import NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

const cache = new NodeCache({ stdTTL: 60 });

export const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Solo cachear peticiones GET
  if (req.method !== "GET") {
    next();
    return;
  }

  const key = `${req.method}-${req.originalUrl}`;
  const cached = cache.get<unknown>(key);

  if (cached) {
    console.log("✅ Respuesta desde cache");
    res.json(cached);
    return;
  }

  // Guardamos la referencia original de res.json
  const originalJson = res.json.bind(res);

  // Sobrescribimos res.json para interceptar la respuesta
  res.json = ((body: unknown) => {
    cache.set(key, body);
    return originalJson(body);
  }) as Response["json"];

  next();
};