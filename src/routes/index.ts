// routes/index.js
// Punto único de exportación de todos los routers de la API.
// Permite importar en server.js así:
//    import { authRouter, adminRouter, … } from './routes/index.js';

export { default as authRouter } from './authRoutes.js';                     // Rutas de autenticación (/auth)
export { default as adminRouter } from './adminRoutes.js';                   // Rutas de administrador (/admin)
export { default as professionalRouter } from './professionalRoutes.js';     // Rutas de profesionales (/professional)
export { default as clientRouter } from './clientRoutes.js';                 // Rutas de clientes (/client)
export { default as managerRouter } from './managerRoutes.js';               // Rutas de managers (/manager)
export { default as financeRouter } from './financeRoutes.js';               // Rutas de finanzas (/finance)
export { default as operationRouter } from './operationRoutes.js';           // Rutas de operaciones (/operations)