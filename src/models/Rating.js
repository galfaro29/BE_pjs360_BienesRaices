import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Rating = sequelize.define(
    'Rating',
    {
      requestId: { type: DataTypes.INTEGER, allowNull: false },
      professionalId: { 
          type: DataTypes.INTEGER, 
          allowNull: false,
            references: {
          model: "Professional",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE", 
      },
      clientId: { type: DataTypes.INTEGER, allowNull: false },
      score: { type: DataTypes.INTEGER, allowNull: false },
      comment: { type: DataTypes.TEXT },
    },
    {
      tableName: 'Rating', // 👈 nombre exacto de la tabla
      freezeTableName: true,  // 👈 evita pluralizar
      timestamps: false,   // 👈 no crea createdAt / updatedAt
    }
  );



  return Rating;
};