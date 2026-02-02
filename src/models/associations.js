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

  /* ========================USER (Common)=============================*/
  // User → Country
  User.belongsTo(Countries, {
    foreignKey: { name: "countryCode", allowNull: true },
    targetKey: "code",
    as: "country",
  });
  Countries.hasMany(User, {
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
  // ProfessionalApplication → User
  ProfessionalApplication.belongsTo(Countries, {
    foreignKey: { name: "countryCode", allowNull: false },
    targetKey: "code",
    as: "country",
  });
  Countries.hasMany(ProfessionalApplication, {
    foreignKey: { name: "countryCode", allowNull: false },
    as: "professionalApplications",
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
  Countries.hasMany(State, { foreignKey: 'countryCode', sourceKey: 'code' });
  State.belongsTo(Countries, { foreignKey: 'countryCode', targetKey: 'code' });

  // State → City
  State.hasMany(City, { foreignKey: 'stateId' });
  City.belongsTo(State, { foreignKey: 'stateId' });

  /* ================PROPERTY============================================*/
  // Property → PropertyType
  PropertyType.hasMany(Property, { foreignKey: 'propertyTypeId' });
  Property.belongsTo(PropertyType, { foreignKey: 'propertyTypeId' });

  // Property → PropertyStatus
  PropertyStatus.hasMany(Property, { foreignKey: 'propertyStatusId' });
  Property.belongsTo(PropertyStatus, { foreignKey: 'propertyStatusId' });

  // Property → City (Location)
  City.hasMany(Property, { foreignKey: 'cityId' });
  Property.belongsTo(City, { foreignKey: 'cityId' });

  // Property → User (Creator)
  User.hasMany(Property, { foreignKey: 'userId', as: 'properties' });
  Property.belongsTo(User, { foreignKey: 'userId', as: 'creator' });

  // Property → Professional (Agent) - Replaces User relationship
  Professional.hasMany(Property, { foreignKey: 'professionalId' });
  Property.belongsTo(Professional, { foreignKey: 'professionalId' });

  // Property → PropertyImage (Gallery)
  Property.hasMany(PropertyImage, { foreignKey: 'propertyId' });
  PropertyImage.belongsTo(Property, { foreignKey: 'propertyId' });

  // Property <-> PropertyAmenity (Many-to-Many)
  Property.belongsToMany(PropertyAmenity, { through: 'PropertyAmenities', foreignKey: 'propertyId', as: 'amenities' });
  PropertyAmenity.belongsToMany(Property, { through: 'PropertyAmenities', foreignKey: 'amenityId', as: 'properties' });

  // User <-> AuditLog
  User.hasMany(AuditLog, { foreignKey: 'userId', sourceKey: 'customId', as: 'auditLogs', constraints: false });
  AuditLog.belongsTo(User, { foreignKey: 'userId', targetKey: 'customId', as: 'user', constraints: false });

};