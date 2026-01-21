import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Professional = sequelize.define(
    'Professional',
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      secondName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      secondLastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lat: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
      },
      lng: {
        type: DataTypes.DECIMAL(10, 6),
        allowNull: true,
      },
      bankName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      accountNumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      accountHolder: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hasVehicle: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      vehicleType: {
        type: DataTypes.ENUM('car', 'motorcycle', 'bike', 'other'),
        allowNull: true,
      },
      canTravel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'Professional',
      freezeTableName: true,  // 👈 evita pluralizar
      timestamps: true,
    }
  );


  return Professional;
};