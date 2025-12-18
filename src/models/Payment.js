import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Payment = sequelize.define(
    'Payment',
    {
      requestId: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.DECIMAL, allowNull: false },
      method: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: 'Payment', // 👈 pluralizado para mantener consistencia
      freezeTableName: true,  // 👈 evita pluralizar
      timestamps: false,     // 👈 no crea createdAt / updatedAt
    }
  );



  return Payment;
};