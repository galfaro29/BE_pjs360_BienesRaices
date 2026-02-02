// src/middleware/index.js
// Punto único de exportación para tus middlewares personalizados.
// Permite importarlos todos desde '../middleware' en lugar de rutas individuales.


// authMiddleware:
//   • Lee y verifica el JWT desde la cookie.
//   • Carga los datos de usuario en req.user.
//   • Responde con 401 si el token falta, expira o es inválido.
export { authMiddleware } from './authMiddleware.js';

// roleMiddleware:
//   • Comprueba que req.user.role esté entre los roles permitidos.
//   • Devuelve 401 si no hay usuario autenticado.
//   • Devuelve 403 si el rol no coincide con los permitidos.
export { roleMiddleware } from './roleMiddleware.js';


// loadUserMiddleware:
//   • Carga el usuario real desde la base de datos usando el ID en req.user.
//   • Adjunta el usuario completo a req.dbUser.
//   • Responde con 401 si el usuario no existe.
//   • Responde con 403 si el usuario está inactivo.
export { loadUserMiddleware } from './loadUserMiddleware.js';
export { default as contextMiddleware, ensureRequestContext } from './contextMiddleware.js';