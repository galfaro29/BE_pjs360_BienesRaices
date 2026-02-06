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
      professionalTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Tipo de profesional solicitado (FK a ProfessionalType.id)',
        references: {
          model: 'ProfessionalType',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
        //comment: "Estado de la solicitud: 'pending', 'approved', 'rejected'",
      },
      displayName: {
        type: DataTypes.STRING(120),
        allowNull: false,
        comment: 'Nombre público que se mostrará si la solicitud es aprobada',
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
        comment:'Correo electrónico visible para clientes (puede ser distinto al email de login)',
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
        //comment: "Tipo de vehículo del profesional ('car', 'motorcycle', 'none')",
      },
      canTravel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indica si el profesional está dispuesto a desplazarse para atender clientes',
      },
      reviewedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id',
        },
        comment: 'ID del usuario administrador que revisó la solicitud (FK a User.id, null al inicio)',
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Motivo del rechazo en caso de que la solicitud sea rechazada',
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