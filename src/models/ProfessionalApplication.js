import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ProfessionalApplication = sequelize.define(
    'ProfessionalApplication',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador único de la solicitud de profesional (PK)',
      },
      professionalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Relación con el perfil profesional (FK a Professional.id)',
        references: {
          model: 'Professional',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Motivo del rechazo en caso de que la solicitud sea rechazada',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Fecha y hora de creación del registro',
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Fecha y hora de la última actualización del registro',
      },
    },
    {
      tableName: 'ProfessionalApplication',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return ProfessionalApplication;
};