import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Countries = sequelize.define(
    'Countries',
    {
      code: { type: DataTypes.STRING(5), primaryKey: true },   // CR, MX, US
      name: { type: DataTypes.STRING(100), allowNull: false }, // Costa Rica, México
    },
    {
      tableName: 'Countries',  // Nombre exacto en DB
      freezeTableName: true,   // Evita pluralizar
      timestamps: false,       // No crear createdAt/updatedAt
    }
  );



  

  return Countries;
};