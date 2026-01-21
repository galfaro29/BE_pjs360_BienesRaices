// 👉 Importar librerías y módulos principales
import express from 'express';                // Framework principal para el servidor HTTP
import dotenv from 'dotenv';                  // Carga variables de entorno desde archivos .env
import cors from 'cors';                      // Middleware para habilitar CORS
import cookieParser from 'cookie-parser';     // Middleware para parsear cookies
import path from "path";

// 👉 Importar routers agrupados
import {
  authRouter,
  adminRouter,
  professionalRouter,
  clientRouter,
} from './routes/index.js';

// 👉 Importar instancia de la base de datos Sequelize
import { db } from './models/index.js';

// 👉 Cargar variables de entorno desde el archivo correspondiente
dotenv.config();

// 👉 Crear la instancia principal de la aplicación Express
const app = express();

// 👉 Habilitar el parseo de cookies HTTP entrantes
app.use(cookieParser());

// 👉 Habilitar el parseo de JSON en solicitudes (req.body)
app.use(express.json());

//Archivos e imagenes
app.use(express.static(path.join(process.cwd(), "public")));

// 👉 Configurar lista de orígenes permitidos para CORS desde variable de entorno
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

// 👉 Middleware CORS personalizado
app.use(cors({
  origin: function (origin, callback) {
    // Permite solicitudes sin origin (por ejemplo, herramientas locales)
    // o solicitudes desde orígenes permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true // Permite envío de cookies/credenciales cruzadas
}));

// 👉 Middleware para agregar cabeceras CORS adicionales (opcional pero recomendable)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin); // Permite origen dinámico
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// 👉 Variable para verificar conexión a la base de datos
let conexDB = false;

// 👉 Intentar conectar a la base de datos y sincronizar según modo definido
try {
  await db.authenticate(); // Verificar credenciales de conexión

  const syncMode = process.env.DB_SYNC_MODE;

  if (syncMode === 'force') {
    // ⚠️ Borra y recrea tablas (peligroso para producción)
    await db.sync({ force: true });
    console.log('💣 DB sincronizada con { force: true }');

  } else if (syncMode === 'alter') {
    // 🧪 Ajusta tablas manteniendo datos
    await db.sync({ alter: true });
    console.log('🧪 DB sincronizada con { alter: true }');

  } else if (syncMode === 'default') {
    // 🔧 Sync normal, no borra nada
    await db.sync();
    console.log('🔧 DB sincronizada con sync()');

  } else {
    console.log('⚠️ Sincronización de DB desactivada (DB_SYNC_MODE=none)');
  }

  conexDB = true;
} catch (error) {
  console.error('❌ Error de conexión a la DB', error);
}


// 👉 Definir puerto y host desde variables de entorno o usar valores por defecto
const port = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || 'localhost';

// 👉 Montar routers organizados por roles o módulos de negocio
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/professional', professionalRouter);
app.use('/client', clientRouter);


// 👉 Iniciar el servidor en el puerto definido
const server = app.listen(port, () => {
  if (!conexDB) {
    console.error('❌ No se pudo conectar a la base de datos. El servidor no se iniciará correctamente.');
    return;
  }
  console.log(`✅ El servidor ${host} está funcionando en el puerto ${port} y la base de datos está conectada: ${conexDB}`);
});

// 👉 Manejar error si el puerto ya está en uso u otro error inesperado
server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Error: El puerto ${port} ya está en uso. Por favor usa otro puerto.`);
  } else {
    console.error('❌ Error inesperado al iniciar el servidor:', err);
  }
});
