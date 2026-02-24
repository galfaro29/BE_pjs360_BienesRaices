import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Professional = sequelize.define(
    'Professional',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        comment: "ID del usuario base (User). Identifica al usuario dueño de este perfil",
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // === Configuración del Profesional ===
      engagementModel: {
        type: DataTypes.ENUM('commission', 'subscription'),
        allowNull: false,
        defaultValue: 'subscription',
        //comment: 'Modelo de contratación del profesional'
      },
      countryCode: {
        type: DataTypes.STRING(5),
        allowNull: true,
        comment: "Código del país del profesional (referencia a Country.code)",
        references: {
          model: "Country",
          key: "code",
        },
      },
      professionalTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'ProfessionalType',
          key: 'id',
        },
      },
      countryProfessionalTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'CountryProfessionalType',
          key: 'id',
        },
      },

      // === Estado del Socio ===
      status: {
        type: DataTypes.ENUM(
          'pending',
          'active_basic',
          'active_verified',
          'rejected',
          'suspended'
        ),
        defaultValue: 'pending',
      },

      // === Información personal y de contacto ===
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Primer nombre del profesional",
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Primer apellido del profesional",
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: "Número de teléfono de contacto del profesional",
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Descripción breve del profesional, experiencia o presentación pública',
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
        type: DataTypes.ENUM('car', 'motorcycle', 'bike', 'other', 'none'),
        defaultValue: 'none',
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
      freezeTableName: true,
      timestamps: true,
      comment: "Perfil extendido del usuario con rol profesional (Fuente de verdad)",
    }
  );

  return Professional;
};
