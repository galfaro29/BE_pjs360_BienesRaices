import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Professional = sequelize.define(
    'Professional',
    {
      // === Identificador (FK a User) ===
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        comment: "ID del usuario base (User). Identifica de forma única al profesional",
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // === Información personal ===
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Primer nombre del profesional",
      },
      secondName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Segundo nombre del profesional (opcional)",
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Primer apellido del profesional",
      },
      secondLastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Segundo apellido del profesional (opcional)",
      },

      // === Contacto ===
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Número de teléfono de contacto del profesional",
      },

      // === Ubicación ===
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Dirección textual o referencia del profesional",
      },
      lat: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        comment: "Latitud geográfica de la ubicación del profesional",
      },
      lng: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
        comment: "Longitud geográfica de la ubicación del profesional",
      },

      // === Información bancaria ===
      bankName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Nombre del banco del profesional",
      },
      accountNumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Número de cuenta bancaria del profesional",
      },
      accountHolder: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: "Nombre del titular de la cuenta bancaria",
      },

      // === Perfil ===
      profileImage: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "Ruta o nombre del archivo de imagen de perfil del profesional",
      },

      // === Movilidad y disponibilidad ===
      hasVehicle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Indica si el profesional cuenta con vehículo propio",
      },
      vehicleType: {
        type: DataTypes.ENUM('car', 'motorcycle', 'bike', 'other'),
        allowNull: true,
        comment: "Tipo de vehículo del profesional, si aplica",
      },
      canTravel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Indica si el profesional está dispuesto a desplazarse para prestar servicios",
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Indica si el profesional se encuentra disponible para recibir solicitudes",
      },
    },
    {
      tableName: 'Professional',
      freezeTableName: true,  // evita pluralización automática
      timestamps: true,
      comment: "Perfil extendido del usuario con rol profesional",
    }
  );

  return Professional;
};
