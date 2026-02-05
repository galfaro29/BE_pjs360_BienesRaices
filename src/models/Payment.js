import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Payment = sequelize.define(
    'Payment',
    {
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          "ID de la solicitud u operación que origina el pago (ej. servicio, orden, proyecto)",
      },

      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment: "Monto total del pago",
      },

      method: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:
          "Método de pago utilizado (ej. CARD, TRANSFER, CASH, SINPE, STRIPE)",
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        comment:
          "Estado del pago (ej. PENDING, COMPLETED, FAILED, CANCELED, REFUNDED)",
      },
    },
    {
      tableName: 'Payment',
      freezeTableName: true,  // evita pluralización automática
      timestamps: false,     // no incluye createdAt / updatedAt
      comment:
        "Registro de pagos realizados dentro del sistema",
    }
  );

  return Payment;
};
