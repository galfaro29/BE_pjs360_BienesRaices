import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Notification = sequelize.define(
    'Notification',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "ID del usuario destinatario de la notificación",
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "Contenido del mensaje de la notificación",
      },

      type: {
        type: DataTypes.STRING,
        allowNull: true,
        comment:
          "Tipo de notificación (ej. SYSTEM, INFO, WARNING, PROPERTY, PAYMENT)",
      },

      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment:
          "Fecha y hora en que el usuario leyó la notificación. Null = no leída",
      },
    },
    {
      tableName: 'Notification',
      freezeTableName: true,     // evita pluralización automática
      timestamps: false,         // no usa createdAt / updatedAt
      comment:
        "Notificaciones internas del sistema enviadas a los usuarios",
    }
  );

  return Notification;
};
