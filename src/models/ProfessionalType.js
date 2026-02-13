import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const ProfessionalType = sequelize.define(
        'ProfessionalType',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Identificador único del tipo de profesional (PK)',
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: "Nombre legible del tipo de profesional (ej: 'Agente Inmobiliario', 'Valuador')",
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si actualmente hay plazas abiertas para este tipo de profesional (true / false)',
            },
            engagementModel: {
                type: DataTypes.ENUM('commission', 'subscription', 'both'),
                allowNull: false,
                defaultValue: 'subscription',
                //comment: 'Define si este tipo profesional trabaja por comisión, suscripción o ambos'
            },
            applicableTo: {
                type: DataTypes.ENUM('seller', 'buyer', 'both'),
                allowNull: false,
                defaultValue: 'both',
                //comment: 'Define si este tipo profesional aplica para vendedor, comprador o ambos'
            },
            created_at: {
                type: DataTypes.DATE,
                comment: 'Fecha y hora de creación del tipo de profesional',
            },
            updated_at: {
                type: DataTypes.DATE,
                comment: 'Fecha y hora de la última actualización',
            },
        },
        {
            tableName: 'ProfessionalType',
            freezeTableName: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return ProfessionalType;
};
