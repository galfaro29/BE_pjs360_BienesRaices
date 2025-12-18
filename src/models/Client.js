import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Client = sequelize.define(
    "Client",
    {
      // === Identificador (FK a User) ===
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // === Identificación personal ===
      fullName: { type: DataTypes.STRING(200), allowNull: true },
      birthDate: { type: DataTypes.DATEONLY, allowNull: true },
      documentType: {
        type: DataTypes.ENUM("ID", "PASSPORT"),
        allowNull: false,
        defaultValue: "ID", // 👈 Valor por defecto
      },
      documentNumber: { type: DataTypes.STRING(50), allowNull: true },

      // === Contacto ===
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: { is: /^\+?[0-9\s\-()]{8,20}$/i },
      },
      altPhone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: { is: /^\+?[0-9\s\-()]{8,20}$/i },
        comment: "Teléfono alterno",
      },
      preferredContact: {
        type: DataTypes.ENUM("WHATSAPP", "EMAIL", "TELEGRAM"),
        allowNull: false,
        defaultValue: "WHATSAPP",
      },
        marketingOptIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      // === Clasificación ===
      categoryCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
        references: {
          model: "CategoriesClient",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      // === Ubicación ===
      address: { type: DataTypes.STRING(255), allowNull: true },
      countryCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
        references: {
          model: "Countries",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      administrativeAreaLevel1: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Estado/provincia/comunidad",
      },
      administrativeAreaLevel2: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Cantón/condado/municipio",
      },
      city: { type: DataTypes.STRING(100), allowNull: true },
      //state: { type: DataTypes.STRING(100), allowNull: true },
      postalCode: { type: DataTypes.STRING(20), allowNull: true },
      lat: { type: DataTypes.DECIMAL(10, 6), allowNull: true },
      lng: { type: DataTypes.DECIMAL(10, 6), allowNull: true },

      // === Perfil ===
      profileImage: {
        type: DataTypes.STRING(255),
        comment: "Ruta del archivo de imagen de perfil",
      },
 
    

      // === Facturación ligera ===
      bankName: { type: DataTypes.STRING(100), allowNull: true },
      accountNumber: { type: DataTypes.STRING(50), allowNull: true },
      accountHolder: { type: DataTypes.STRING(200), allowNull: true },
    },
    {
      tableName: "Client",
      freezeTableName: true,  // 👈 evita pluralizar
      timestamps: true,
      indexes: [
        { fields: ["userId"], unique: true },
        { fields: ["documentNumber"] },
        { fields: ["countryCode", "city"] },
        { fields: ["administrativeAreaLevel1", "administrativeAreaLevel2"] },
        { fields: ["phone"] },
      ],
    }
  );
  
  return Client;
};