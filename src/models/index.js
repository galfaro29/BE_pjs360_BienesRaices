// 1️⃣ Importa la instancia de la base de datos
import db from "../config/db.js";

// 2️⃣ Importa solo los modelos que existen en la carpeta
import userModel from "./User.js";
import clientModel from "./Client.js";
import professionalModel from "./Professional.js";
import professionalApplicationModel from "./ProfessionalApplication.js";
import paymentModel from "./Payment.js";
import depositModel from "./Deposit.js";
import ratingModel from "./Rating.js";
import notificationModel from "./Notification.js";
import categoryModel from "./CategoriesClient.js";
import countryModel from "./Countries.js";
import stateModel from "./State.js";
import cityModel from "./City.js";
import propertyModel from "./Property.js";
import propertyTypeModel from "./PropertyType.js";
import propertyStatusModel from "./PropertyStatus.js";
import propertyAmenityModel from "./PropertyAmenity.js";
import propertyImageModel from "./PropertyImage.js";
import clientSubscriptionModel from "./ClientSubscription.js";
import agentSubscriptionModel from "./AgentSubscription.js";
import propertyPublicationModel from "./PropertyPublication.js";
import auditLogModel from "./AuditLog.js";
import applyAssociations from "./associations.js";

// 3️⃣ Inicializa los modelos
const models = {
  User: userModel(db),
  Client: clientModel(db),
  Professional: professionalModel(db),
  ProfessionalApplication: professionalApplicationModel(db),
  Payment: paymentModel(db),
  Deposit: depositModel(db),
  Rating: ratingModel(db),
  Notification: notificationModel(db),
  CategoriesClient: categoryModel(db),
  Countries: countryModel(db),
  State: stateModel(db),
  City: cityModel(db),
  Property: propertyModel(db),
  PropertyType: propertyTypeModel(db),
  PropertyStatus: propertyStatusModel(db),
  PropertyAmenity: propertyAmenityModel(db),
  PropertyImage: propertyImageModel(db),
  ClientSubscription: clientSubscriptionModel(db),
  AgentSubscription: agentSubscriptionModel(db),
  PropertyPublication: propertyPublicationModel(db),
  AuditLog: auditLogModel(db),
};

/* 
// 4️⃣ Ejecuta las asociaciones de cada modelo
Object.entries(models).forEach(([name, model]) => {
  if (typeof model.associate === "function") {
    try {
      model.associate(models);
      console.log(`✅ Asociaciones cargadas: ${name}`);
    } catch (error) {
      console.error(`❌ Error en asociaciones de ${name}:`, error.message);
    }
  }
});
*/

applyAssociations(models);
console.log("🔥 Asociaciones aplicadas desde associations.js");

// 5️⃣ Exportaciones
export const {
  User,
  Client,
  Professional,
  ProfessionalApplication,
  Payment,
  Deposit,
  Rating,
  Notification,
  CategoriesClient,
  Countries,
  State,
  City,
  Property,
  PropertyType,
  PropertyStatus,
  PropertyAmenity,
  PropertyImage,
  ClientSubscription,
  AgentSubscription,
  PropertyPublication,
  AuditLog,
} = models;

export { db };
export default { db, ...models };