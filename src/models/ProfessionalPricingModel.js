import { DataTypes } from 'sequelize';

export default (sequelize) => {
  /**
   * Modelo de Planes de Precio para Profesionales.
   * Controla los planes, límites y vigencia de los profesionales o agencias
   * dentro del sistema (ej. cantidad de propiedades activas, clientes, etc.).
   */
  const ProfessionalPricingModel = sequelize.define(
    'ProfessionalPricingModel',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        comment: 'Identificador único del plan de precio del profesional',
      },

      professionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'ID del perfil profesional que es dueño del plan',
        references: {
          model: 'Professional',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      planType: {
        type: DataTypes.ENUM('PROFESSIONAL_PRO', 'AGENCIA'),
        allowNull: false,
        defaultValue: 'PROFESSIONAL_PRO',
        //comment: 'Tipo de plan contratado por el profesional (PROFESSIONAL_PRO o AGENCIA)',
      },

      status: {
        type: DataTypes.ENUM('ACTIVA', 'EXPIRADA'),
        allowNull: false,
        defaultValue: 'ACTIVA',
        //comment: 'Estado actual del plan (ACTIVA o EXPIRADA)',
      },

      maxActiveProps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Cantidad máxima de propiedades que el profesional puede tener activas simultáneamente',
      },

      maxClients: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Cantidad máxima de clientes permitidos según el plan contratado',
      },

      startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Fecha de inicio del periodo actual del plan',
      },

      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Fecha de expiración del periodo actual del plan',
      },
    },
    {
      tableName: 'ProfessionalPricingModel',
      freezeTableName: true, // evita pluralización automática
      timestamps: true,
      comment: 'Planes de precio y límites contratados por profesionales o agencias',
    }
  );

  return ProfessionalPricingModel;
};
