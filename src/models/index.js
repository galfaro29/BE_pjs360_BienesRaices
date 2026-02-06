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
import countryModel from "./Country.js";
import stateModel from "./State.js";
import cityModel from "./City.js";
import propertyModel from "./Property.js";
import propertyTypeModel from "./PropertyType.js";
import propertyOfferTypeModel from "./PropertyOfferType.js";
import propertyAmenityModel from "./PropertyAmenity.js";
import propertyImageModel from "./PropertyImage.js";
import clientSubscriptionModel from "./ClientSubscription.js";
import agentSubscriptionModel from "./AgentSubscription.js";
import propertyPublicationModel from "./PropertyPublication.js";
import auditLogModel from "./AuditLog.js";
import propertyResidentialDetailModel from "./PropertyResidentialDetail.js";
import propertyLandDetailModel from "./PropertyLandDetail.js";
import propertyOfficeDetailModel from "./PropertyOfficeDetail.js";
import propertyWarehouseDetailModel from "./PropertyWarehouseDetail.js";
import propertyBuildingDetailModel from "./PropertyBuildingDetail.js";
import propertyCommercialDetailModel from "./PropertyCommercialDetail.js";
import propertySchemaLinkModel from "./PropertySchemaLink.js";
import professionalTypeModel from "./ProfessionalType.js";
import applyAssociations from "./associations.js";
import addAuditHooks from "../helpers/auditHooks.js"; //Auditoría automática (INSERT/UPDATE/DELETE) sin tocar
//controladores, usando AsyncLocalStorage. Incluye: - requestContext global - middleware Express -
//addAuditHooks genérico - activación en models/index.js

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
  Country: countryModel(db),
  State: stateModel(db),
  City: cityModel(db),
  Property: propertyModel(db),
  PropertyType: propertyTypeModel(db),
  PropertyOfferType: propertyOfferTypeModel(db),
  PropertyAmenity: propertyAmenityModel(db),
  PropertyImage: propertyImageModel(db),
  ClientSubscription: clientSubscriptionModel(db),
  AgentSubscription: agentSubscriptionModel(db),
  PropertyPublication: propertyPublicationModel(db),
  AuditLog: auditLogModel(db),
  PropertyResidentialDetail: propertyResidentialDetailModel(db),
  PropertyLandDetail: propertyLandDetailModel(db),
  PropertyOfficeDetail: propertyOfficeDetailModel(db),
  PropertyWarehouseDetail: propertyWarehouseDetailModel(db),
  PropertyBuildingDetail: propertyBuildingDetailModel(db),
  PropertyCommercialDetail: propertyCommercialDetailModel(db),
  PropertySchemaLink: propertySchemaLinkModel(db),
  ProfessionalType: professionalTypeModel(db),
};


applyAssociations(models);
console.log("🔥 Asociaciones aplicadas desde associations.js");

// 5️⃣ Aplicar hooks de auditoría automáticos
Object.values(models).forEach(model => {
  addAuditHooks(model, db);
});
console.log("📝 Hooks de auditoría aplicados");

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
  Country,
  State,
  City,
  Property,
  PropertyType,
  PropertyOfferType,
  PropertyAmenity,
  PropertyImage,
  ClientSubscription,
  AgentSubscription,
  PropertyPublication,
  AuditLog,
  PropertyResidentialDetail,
  PropertyLandDetail,
  PropertyOfficeDetail,
  PropertyWarehouseDetail,
  PropertyBuildingDetail,
  PropertyCommercialDetail,
  PropertySchemaLink,
  ProfessionalType,
} = models;

export { db };
export default { db, ...models };