import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Deposit = sequelize.define(
    'Deposit',
    {
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          "ID del proyecto o servicio al que corresponde el depósito",
      },

      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:
          "ID del cliente que realiza el depósito",
      },

      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        comment:
          "Monto del depósito realizado por el cliente",
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment:
          "Fecha y hora en que se registró el depósito",
      },

      invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        comment:
          "Número de factura asociada al depósito, si aplica",
      },
    },
    {
      tableName: 'Deposit',
      freezeTableName: true, // evita pluralización automática
      timestamps: false,    // no incluye createdAt / updatedAt
      comment:
        "Registro de depósitos realizados por clientes para proyectos o servicios",
    }
  );

  return Deposit;
};
