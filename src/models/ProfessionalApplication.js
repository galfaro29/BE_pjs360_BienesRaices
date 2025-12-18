// models/ProfessionalApplication.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ProfessionalApplication = sequelize.define(
    "ProfessionalApplication",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        validate: { isEmail: true },
      },
      locale: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "es",
      },
      state: {
        type: DataTypes.ENUM('pending', 'progress', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      countryCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
    },
    {
      tableName: "ProfessionalApplication",
      freezeTableName: true, // 👈 evita pluralizar
      timestamps: true, // ✅ activa createdAt y updatedAt automáticos
    }
  );



  return ProfessionalApplication;
};