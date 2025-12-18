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
  } = models;

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
  // Client → Country
  Client.belongsTo(Countries, {
    foreignKey: { name: "countryCode", allowNull: false },
    targetKey: "code",
    as: "country",
  });
  Countries.hasMany(Client, {
    foreignKey: { name: "countryCode", allowNull: false },
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
  // Rating → Client
  Rating.belongsTo(Client, {
    foreignKey: { name: "clientId", allowNull: false },
    as: "client",
  });
  Client.hasMany(Rating, {
    foreignKey: { name: "clientId", allowNull: false },
    as: "ratings",
  });
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

};