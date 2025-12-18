import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Notification = sequelize.define(
    'Notification',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      message: { type: DataTypes.TEXT, allowNull: false },
      type: { type: DataTypes.STRING },
      readAt: { type: DataTypes.DATE },
    },
    {
      tableName: 'Notification', // 👈 nombre exacto de la tabla
      freezeTableName: true,   // 👈 evita pluralizar
      timestamps: false,         // 👈 no crea createdAt / updatedAt
    }
  );


  return Notification;
};