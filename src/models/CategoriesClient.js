import { DataTypes } from "sequelize";

export default (sequelize) => {
  const CategoriesClient = sequelize.define(
    "CategoriesClient",
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "CategoriesClient",
      freezeTableName: true,  // 👈 evita pluralizar
      timestamps: false,
    }
  );


  return CategoriesClient;
};