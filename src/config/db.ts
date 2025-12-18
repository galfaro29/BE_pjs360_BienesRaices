import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, "../../");
import { Sequelize } from "sequelize";     // ORM para conectar y manejar la BD
import { config } from 'dotenv';           // Carga variables de entorno

// Determina entorno desde NODE_ENV (definido en package.json scripts)
const env = process.env.NODE_ENV || 'DEV';

if (env === 'DEV') {
  config({ path: path.join(rootPath, '.env.development') });   // Variables para desarrollo
  console.log('🚀 Ejecutando en entorno DESARROLLO');
} else if (env === 'QA') {
  config({ path: path.join(rootPath, '.env.test') });          // Variables para QA/Test
  console.log('🧪 Ejecutando en entorno QA');
} else if (env === 'PROD') {
  config({ path: path.join(rootPath, '.env.production') });    // Variables para producción
  console.log('🏭 Ejecutando en entorno PRODUCCIÓN');
} else {
  throw new Error(`❌ Entorno no reconocido: ${env}`);
}

// Crear instancia Sequelize con credenciales y opciones
const db = new Sequelize(
  process.env.DB_NOMBRE!,                   // Nombre de la BD
  process.env.DB_USER!,                     // Usuario
  process.env.DB_PASS ?? '',               // Contraseña (fallback a '')
  {
    host: process.env.DB_HOST!,             // Host o IP de la BD
    port: Number(process.env.DB_PORT!),     // Puerto de conexión
    dialect: 'postgres',                   // Motor de base de datos
    define: {
      freezeTableName: true,               // Evita que Sequelize pluralice los nombres de tablas
      timestamps: true                     // Añade createdAt / updatedAt automáticamente
    },
    timezone: '-06:00',                    // ⏰ Hora local de Costa Rica (UTC-6)
    dialectOptions: {
      useUTC: false,                       // No usar UTC al leer fechas
      timezone: 'America/Costa_Rica', // 👈 fuerza zona horaria local en cada conexión
    },
    pool: {
      max: 200,                            // Máximo de conexiones simultáneas
      min: 0,                              // Mínimo de conexiones
      acquire: 30000,                      // Tiempo de espera para adquirir conexión (ms)
      idle: 10000                          // Tiempo antes de liberar conexión inactiva (ms)
    },
    logging: false,                        // Desactiva logs de SQL en consola
  }
); 

// Verificar la conexión al arrancar la app
try {
  await db.authenticate();                 // Lanza si hay error de credenciales/host
  console.log('✅ Conexión a la BD establecida correctamente (hora local CR).');
} catch (error) {
  console.error('❌ No se pudo conectar a la base de datos:', error);
}

export default db;                         // Exporta la instancia para usar en todos los modelos