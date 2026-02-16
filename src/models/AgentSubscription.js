import { DataTypes } from 'sequelize';

export default (sequelize) => {
  /**
   * Modelo de Suscripciones para Agentes / Profesionales.
   * Controla los planes, límites y vigencia de los agentes o agencias
   * dentro del sistema (ej. cantidad de propiedades activas, clientes, etc.).
   */
  const AgentSubscription = sequelize.define(
    'AgentSubscription',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        comment: 'Identificador único de la suscripción del agente',
      },

      professionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'ID del perfil profesional que es dueño de la suscripción',
        references: {
          model: 'Professional',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      planType: {
        type: DataTypes.ENUM('AGENTE_PRO', 'AGENCIA'),
        allowNull: false,
        defaultValue: 'AGENTE_PRO',
        //comment: 'Tipo de plan contratado por el agente (AGENTE_PRO o AGENCIA)',
      },

      status: {
        type: DataTypes.ENUM('ACTIVA', 'EXPIRADA'),
        allowNull: false,
        defaultValue: 'ACTIVA',
        //comment: 'Estado actual de la suscripción (ACTIVA o EXPIRADA)',
      },

      maxActiveProps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Cantidad máxima de propiedades que el agente puede tener activas simultáneamente',
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
        comment: 'Fecha de inicio del periodo actual de la suscripción',
      },

      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Fecha de expiración del periodo actual de la suscripción',
      },
    },
    {
      tableName: 'AgentSubscription',
      freezeTableName: true, // evita pluralización automática
      timestamps: true,
      comment: 'Suscripciones y planes contratados por agentes o agencias',
    }
  );

  return AgentSubscription;
};
