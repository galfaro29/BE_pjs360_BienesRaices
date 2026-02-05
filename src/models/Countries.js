import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Countries = sequelize.define(
    'Countries',
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        comment:
          "Código único del país según estándar ISO (ej. CR, MX, US)",
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment:
          "Nombre oficial del país (ej. Costa Rica, México, Estados Unidos)",
      },
    },
    {
      tableName: 'Countries',   // nombre exacto en la base de datos
      freezeTableName: true,    // evita pluralización automática
      timestamps: false,        // no incluye createdAt / updatedAt
      comment:
        "Catálogo de países utilizado para ubicación y configuración regional",
    }
  );

  return Countries;
};
