import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Rating = sequelize.define(
    'Rating',
    {
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          "ID de la solicitud, servicio o proyecto que origina la calificación",
      },

      professionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          "ID del profesional calificado (referencia a Professional.userId)",
        references: {
          model: "Professional",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          "Puntuación otorgada al profesional (ej. escala de 1 a 5)",
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment:
          "Comentario u observación opcional del cliente sobre el servicio recibido",
      },
    },
    {
      tableName: 'Rating',
      freezeTableName: true,  // evita pluralización automática
      timestamps: false,     // no incluye createdAt / updatedAt
      comment:
        "Calificaciones y reseñas otorgadas a profesionales por servicios prestados",
    }
  );

  return Rating;
};
