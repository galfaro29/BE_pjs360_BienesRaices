import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Country = sequelize.define(
    'Country',
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

      currency: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: "Moneda oficial del país (ej. CRC, USD, MXN)",
      },

      currencySymbol: {
        type: DataTypes.STRING(5),
        allowNull: true,
        comment: "Símbolo de la moneda (ej. ₡, $, Mex$)",
      },

      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Indica si el país está activo para operaciones generales",
      },

      allowRegister: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: "Indica si se permite el registro de nuevos usuarios en este país",
      },

      allowBusiness: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "Indica si se permiten publicaciones y ventas en este país",
      },
    },
    {
      tableName: 'Country',   // nombre exacto en la base de datos
      freezeTableName: true,    // evita pluralización automática
      timestamps: false,        // no incluye createdAt / updatedAt
      comment:
        "Catálogo de países. status=false -> país existe pero no se usa; allowRegister=true -> pueden crear usuario; allowBusiness=false -> NO pueden publicar ni vender",
    }
  );

  return Country;
};
