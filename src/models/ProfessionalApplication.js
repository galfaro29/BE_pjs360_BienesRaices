import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProfessionalApplication = sequelize.define(
    'ProfessionalApplication',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único de la solicitud de profesional (PK)',
      },
      countryProfessionalTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Relación con la configuración de tipo profesional por país (FK a CountryProfessionalType.id)',
        references: {
          model: 'CountryProfessionalType',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
      displayName: {
        type: DataTypes.STRING(120),
        allowNull: false,
        comment: 'Nombre público/Username que se mostrará si la solicitud es aprobada',
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: 'Teléfono de contacto del profesional',
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: { isEmail: true },
        comment: 'Correo electrónico visible para clientes (puede ser distinto al email de login)',
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Descripción breve del profesional, experiencia o presentación pública',
      },
      hasVehicle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indica si el profesional cuenta con vehículo propio (true / false)',
      },
      vehicleType: {
        type: DataTypes.ENUM('car', 'motorcycle', 'none'),
        defaultValue: 'none',
      },
      canTravel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indica si el profesional está dispuesto a desplazarse para atender clientes',
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Motivo del rechazo en caso de que la solicitud sea rechazada',
      },
      engagementModel: {
        type: DataTypes.ENUM('commission', 'subscription'),
        allowNull: false,
        defaultValue: 'subscription',
        //comment: 'Modelo de contratación elegido por el profesional (comisión o suscripción)'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Fecha y hora de creación del registro',
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Fecha y hora de la última actualización del registro (normalmente al revisar)',
      },
    },
    {
      tableName: 'ProfessionalApplication',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return ProfessionalApplication;
};