import { DataTypes } from "sequelize";

export default (sequelize) => {
  const CategoriesClient = sequelize.define(
    "CategoriesClient",
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        comment:
          "Código único de la categoría del cliente (ej. C, P, VIP, CORP)",
      },

      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment:
          "Nombre descriptivo de la categoría del cliente",
      },
    },
    {
      tableName: "CategoriesClient",
      freezeTableName: true, // evita pluralización automática
      timestamps: false,
      comment:
        "Catálogo de categorías para clasificar clientes según tipo o segmento",
    }
  );

  return CategoriesClient;
};
