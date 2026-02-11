export default (models) => {
  const {
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
    CountryProfessionalType,
  } = models;

  /* ========================USER (Common)=============================*/
  // User → Country
  User.belongsTo(Country, {
    foreignKey: { name: "countryCode", allowNull: true },
    targetKey: "code",
    as: "country",
  });
  Country.hasMany(User, {
    foreignKey: { name: "countryCode", allowNull: true },
    as: "users",
  });

  // User → ClientSubscription
  User.hasOne(ClientSubscription, {
    foreignKey: { name: "userId", allowNull: false },
    as: "clientSubscription",
  });
  ClientSubscription.belongsTo(User, {
    foreignKey: { name: "userId", allowNull: false },
    as: "user",
  });

  // User → AgentSubscription
  User.hasOne(AgentSubscription, {
    foreignKey: { name: "agentUserId", allowNull: false },
    as: "agentSubscription",
  });
  AgentSubscription.belongsTo(User, {
    foreignKey: { name: "agentUserId", allowNull: false },
    as: "user",
  });

  /* ========================CLIENT====================================*/
  // Client → User
  Client.belongsTo(User, {
    foreignKey: { name: "userId", allowNull: false },
    as: "user",
  });
  User.hasOne(Client, {
    foreignKey: { name: "userId", allowNull: false },
    as: "client",
  });
  // Client → Category
  Client.belongsTo(CategoriesClient, {
    foreignKey: { name: "categoryCode", allowNull: false },
    targetKey: "code",
    as: "category",
  });
  CategoriesClient.hasMany(Client, {
    foreignKey: { name: "categoryCode", allowNull: false },
    as: "clients",
  });

  // Client → Deposit
  Client.hasMany(Deposit, {
    foreignKey: { name: "clientId", allowNull: false },
    as: "deposits",
  });
  Deposit.belongsTo(Client, {
    foreignKey: { name: "clientId", allowNull: false },
    as: "client",
  });
  // Default documentType for Client
  Client.beforeValidate((client) => {
    if (!client.documentType) {
      client.documentType = "ID";
    }
  });

  /* ==================PROFESSIONAL==========================================*/
  // Professional → User
  Professional.belongsTo(User, {
    foreignKey: { name: "userId", allowNull: false },
    as: "user",
  });
  User.hasOne(Professional, {
    foreignKey: { name: "userId", allowNull: false },
    as: "professional",
  });



  /* ==================RATING==========================================*/

  // Rating → Professional
  Rating.belongsTo(Professional, {
    foreignKey: { name: "professionalId", allowNull: false },
    as: "professional",
  });
  Professional.hasMany(Rating, {
    foreignKey: { name: "professionalId", allowNull: false },
    as: "ratings",
  });

  /* ==================PROFESSIONAL APPLICATION=========================*/
  // ProfessionalApplication → CountryProfessionalType
  ProfessionalApplication.belongsTo(CountryProfessionalType, {
    foreignKey: { name: "countryProfessionalTypeId", allowNull: false },
    as: "countryConfig",
  });
  CountryProfessionalType.hasMany(ProfessionalApplication, {
    foreignKey: { name: "countryProfessionalTypeId", allowNull: false },
    as: "applications",
  });

  // Country <-> ProfessionalType (N:M via CountryProfessionalType)
  Country.hasMany(CountryProfessionalType, {
    foreignKey: "countryCode",
    sourceKey: "code",
    as: "professionalTypeConfigs",
  });
  CountryProfessionalType.belongsTo(Country, {
    foreignKey: "countryCode",
    targetKey: "code",
    as: "country",
  });

  ProfessionalType.hasMany(CountryProfessionalType, {
    foreignKey: "professionalTypeId",
    as: "countryConfigs",
  });
  CountryProfessionalType.belongsTo(ProfessionalType, {
    foreignKey: "professionalTypeId",
    as: "professionalType",
  });

  ProfessionalType.belongsToMany(Country, {
    through: CountryProfessionalType,
    foreignKey: "professionalTypeId",
    otherKey: "countryCode",
    as: "countries",
  });
  Country.belongsToMany(ProfessionalType, {
    through: CountryProfessionalType,
    foreignKey: "countryCode",
    otherKey: "professionalTypeId",
    as: "professionalTypes",
  });


  /* ================NOTIFICATION============================================*/
  // Notification → User
  Notification.belongsTo(User, {
    foreignKey: { name: "userId", allowNull: false },
    as: "user",
  });
  User.hasMany(Notification, {
    foreignKey: { name: "userId", allowNull: false },
    as: "notifications",
  });

  /* ================LOCATION============================================*/
  // Country → State
  Country.hasMany(State, { foreignKey: 'countryCode', sourceKey: 'code' });
  State.belongsTo(Country, { foreignKey: 'countryCode', targetKey: 'code' });

  // State → City
  State.hasMany(City, { foreignKey: 'stateId' });
  City.belongsTo(State, { foreignKey: 'stateId' });

  /* ================PROPERTY============================================*/

  // Property → PropertyType
  Property.belongsTo(PropertyType, {
    foreignKey: 'propertyTypeId',
    as: 'type',
  });
  PropertyType.hasMany(Property, {
    foreignKey: 'propertyTypeId',
    as: 'properties',
  });

  // Property → PropertyOfferType
  Property.belongsTo(PropertyOfferType, {
    foreignKey: 'offerTypeId',
    as: 'offerType',
  });
  PropertyOfferType.hasMany(Property, {
    foreignKey: 'offerTypeId',
    as: 'properties',
  });

  // Property → Country (location)
  Property.belongsTo(Country, {
    foreignKey: 'countryCode',
    targetKey: 'code',
    as: 'country',
  });
  Country.hasMany(Property, {
    foreignKey: 'countryCode',
    sourceKey: 'code',
    as: 'properties',
  });

  // Property → User (Owner / Creator)
  Property.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner',
  });
  User.hasMany(Property, {
    foreignKey: 'userId',
    as: 'properties',
  });



  // Property → Images
  Property.hasMany(PropertyImage, {
    foreignKey: 'propertyId',
    as: 'images',
  });
  PropertyImage.belongsTo(Property, {
    foreignKey: 'propertyId',
    as: 'property',
  });

  // Property → Publications
  Property.hasMany(PropertyPublication, {
    foreignKey: 'propertyId',
    as: 'publications',
  });
  PropertyPublication.belongsTo(Property, {
    foreignKey: 'propertyId',
    as: 'property',
  });

  // Property ↔ Amenities (N:M)
  Property.belongsToMany(PropertyAmenity, {
    through: 'PropertyAmenityLink',
    foreignKey: 'propertyId',
    otherKey: 'amenityId',
    as: 'PropertyAmenity',
  });
  PropertyAmenity.belongsToMany(Property, {
    through: 'PropertyAmenityLink',
    foreignKey: 'amenityId',
    otherKey: 'propertyId',
    as: 'properties',
  });

  /* ================== PROPERTY ↔ DETAILS (1:1) ========================= */
  Property.hasOne(PropertyResidentialDetail, { foreignKey: 'propertyId' });
  Property.hasOne(PropertyLandDetail, { foreignKey: 'propertyId' });
  Property.hasOne(PropertyOfficeDetail, { foreignKey: 'propertyId' });
  Property.hasOne(PropertyCommercialDetail, { foreignKey: 'propertyId' });
  Property.hasOne(PropertyWarehouseDetail, { foreignKey: 'propertyId' });
  Property.hasOne(PropertyBuildingDetail, { foreignKey: 'propertyId' });

  PropertyResidentialDetail.belongsTo(Property, { foreignKey: 'propertyId' });
  PropertyLandDetail.belongsTo(Property, { foreignKey: 'propertyId' });
  PropertyOfficeDetail.belongsTo(Property, { foreignKey: 'propertyId' });
  PropertyCommercialDetail.belongsTo(Property, { foreignKey: 'propertyId' });
  PropertyWarehouseDetail.belongsTo(Property, { foreignKey: 'propertyId' });
  PropertyBuildingDetail.belongsTo(Property, { foreignKey: 'propertyId' });

  /* ================== CONTROL (CORRECTA) ========================= */
  PropertyType.hasOne(PropertySchemaLink, {
    foreignKey: 'propertyTypeId',
    as: 'schema',
  });

  PropertySchemaLink.belongsTo(PropertyType, {
    foreignKey: 'propertyTypeId',
    as: 'propertyType',
  });

  // User <-> AuditLog (Preserved)
  User.hasMany(AuditLog, { foreignKey: 'userId', sourceKey: 'customId', as: 'auditLogs', constraints: false });
  AuditLog.belongsTo(User, { foreignKey: 'userId', targetKey: 'customId', as: 'user', constraints: false });

};