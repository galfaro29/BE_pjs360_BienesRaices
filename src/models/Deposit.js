import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Deposit = sequelize.define(
    'Deposit',
    {
      projectId: { type: DataTypes.INTEGER, allowNull: false },
      clientId: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      invoiceNumber: { type: DataTypes.STRING },
    },
    {
      tableName: 'Deposit', // 👈 nombre exacto de la tabla
      freezeTableName: true, // 👈 evita pluralizar
      timestamps: false,    // 👈 no crea createdAt / updatedAt
    }
  );



  return Deposit;
};