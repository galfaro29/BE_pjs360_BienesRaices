# 📦 Backend PJS360 - Sistema de Gestión de Servicios Profesionales

Este backend está construido con **Node.js**, **Express** y **Sequelize ORM** (modo ESM), y forma parte del proyecto PJS360 para gestionar solicitudes de servicios profesionales entre clientes y profesionales (partners).

## 🚀 Tecnologías Utilizadas

- Node.js (ES Modules)
- Express
- Sequelize ORM
- MySQL / PostgreSQL
- JWT (Tokens)
- Cookies para sesión segura
- Arquitectura modular
- Internacionalización (i18n)

## 📁 Estructura de Modelos

| Modelo               | Descripción breve                                           |
|----------------------|-------------------------------------------------------------|
| User                 | Usuarios del sistema (cliente, profesional, admin, etc.)    |
| Professional         | Información adicional para profesionales / partners         |
| ServiceCategory      | Categorías de los servicios                                 |
| Service              | Servicios disponibles                                        |
| Request              | Solicitudes de servicio                                      |
| RequestNote          | Notas internas sobre la solicitud                           |
| RequestImage         | Imágenes adjuntas a solicitudes                             |
| RequestStatusHistory | Historial de cambios de estado de solicitudes               |
| Payment              | Pagos de los clientes                                       |
| Payroll              | Planilla para pagos a profesionales                         |
| Rating               | Calificaciones de servicios                                 |
| Recommendation       | Recomendaciones para mejorar el servicio                    |
| WarrantyClaim        | Reclamaciones de garantía                                   |
| Notification         | Notificaciones para usuarios                                |
| Project              | Proyectos grandes divididos en fases                        |
| ProjectMilestone     | Hitos dentro de un proyecto                                 |
| Deposit              | Depósitos realizados por el cliente                         |
| ProfessionalPayment  | Pagos hechos a profesionales                                |
| DeliveryAct          | Actas de entrega de proyecto o servicio                     |
| CorporatePartner     | Empresa proveedora (partner empresarial)                    |

## 🔄 Relación entre Tablas (resumen)

- `Professional` ➝ pertenece a `User`
- `Service` ➝ pertenece a `ServiceCategory`
- `Request` ➝ pertenece a `User`, `Service`, `Professional`
- `RequestNote`, `RequestImage`, `RequestStatusHistory` ➝ pertenecen a `Request`
- `Payment` ➝ pertenece a `Request`
- `Payroll` ➝ pertenece a `Professional`
- `WarrantyClaim` ➝ pertenece a `Request` y `Professional`
- `Rating` ➝ pertenece a `Request`
- `Recommendation` ➝ pertenece a `User`
- `Notification` ➝ pertenece a `User`
- `Deposit` ➝ pertenece a `User` y `Project`
- `ProfessionalPayment` ➝ pertenece a `Professional` y `ProjectMilestone`
- `DeliveryAct` ➝ pertenece a `Project`
- `ProjectMilestone` ➝ pertenece a `Project`
- `Project` ➝ pertenece a `User` y `Professional`

## ⚙️ Instrucciones para Desarrollo

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/pjs360-backend.git
cd pjs360-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar base de datos

Editar `config/db.js` con tus credenciales:

```js
const db = new Sequelize('basededatos', 'usuario', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
```

### 4. Sincronizar modelos
```bash
npm run sync
```

O para forzar creación limpia (cuidado: borra todo):

```bash
npm run sync:force
```

### 5. Ejecutar el servidor
```bash
npm run dev
```

## 🛡️ Seguridad

- Las contraseñas están encriptadas con `bcrypt`.
- Se usa autenticación por token (`JWT`) y cookies seguras para el manejo de sesiones.

## 🧩 A futuro

- [ ] Agregar auditoría de cambios.
- [ ] Manejo de archivos con S3 o similar.
- [ ] Panel administrativo con métricas en tiempo real.

---

Para dudas técnicas, contactá al desarrollador principal: **gabriel.alfaro.cruz@gmail.com**
# FE_BienesRaices

## 🧩 Formas de ejecutar
start      → JS (solo si existiera)
dev        → JS (solo si existiera)
start:ts   → producción con TypeScript compilado
dev:ts     → desarrollo con TypeScript
bundle     → producción con archivo único