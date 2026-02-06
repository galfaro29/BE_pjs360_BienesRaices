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
        comment: "ID del usuario base (User). Identifica de forma única al cliente.",
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // === Identificación personal ===
      fullName: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: "Nombre completo del cliente",
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: "Fecha de nacimiento del cliente",
      },
      documentType: {
        type: DataTypes.ENUM("ID", "PASSPORT"),
        allowNull: false,
        defaultValue: "ID",
        //comment: "Tipo de documento de identificación",
      },
      documentNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Número del documento de identificación",
      },

      // === Contacto ===
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Número de teléfono principal del cliente",
        validate: { is: /^(\+?[0-9\s\-()]{7,20})?$/i },
      },
      altPhone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Teléfono alterno de contacto",
        validate: { is: /^(\+?[0-9\s\-()]{7,20})?$/i },
      },
      preferredContact: {
        type: DataTypes.ENUM("WHATSAPP", "EMAIL", "TELEGRAM"),
        allowNull: false,
        defaultValue: "WHATSAPP",
       // comment: "Canal de comunicación preferido por el cliente",
      },
      marketingOptIn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Indica si el cliente autorizó recibir comunicaciones de marketing y promociones",
      },

      // === Clasificación ===
      categoryCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
        comment: "Categoría del cliente según el catálogo CategoriesClient",
        references: {
          model: "CategoriesClient",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      // === Ubicación / Dirección ===
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Dirección textual o referencia del domicilio",
      },
      administrativeAreaLevel1: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Estado, provincia o región administrativa principal",
      },
      administrativeAreaLevel2: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Cantón, municipio o división administrativa secundaria",
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Ciudad o localidad",
      },
      postalCode: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Código postal",
      },
      lat: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        comment: "Latitud geográfica del domicilio",
      },
      lng: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        comment: "Longitud geográfica del domicilio",
      },

      // === Perfil ===
      profileImage: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Ruta o nombre del archivo de imagen de perfil del cliente",
      },

      // === Información bancaria (facturación ligera / reembolsos) ===
      bankName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Nombre del banco del cliente",
      },
      accountNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "Número de cuenta bancaria del cliente",
      },
      accountHolder: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: "Nombre del titular de la cuenta bancaria",
      },
    },
    {
      tableName: "Client",
      freezeTableName: true, // evita pluralización automática
      timestamps: true,
      comment: "Perfil extendido del usuario con rol cliente",
      indexes: [
        { fields: ["userId"], unique: true },
        { fields: ["documentNumber"] },
        { fields: ["administrativeAreaLevel1", "administrativeAreaLevel2"] },
        { fields: ["phone"] },
      ],
    }
  );

  return Client;
};
