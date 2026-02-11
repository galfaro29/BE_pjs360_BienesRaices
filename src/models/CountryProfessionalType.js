import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const CountryProfessionalType = sequelize.define(
        'CountryProfessionalType',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Identificador único de la configuración por país (PK)',
            },
            countryCode: {
                type: DataTypes.STRING(5),
                allowNull: false,
                comment: 'Código del país (FK -> Country.code)',
                references: {
                    model: 'Country',
                    key: 'code',
                },
            },
            professionalTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del tipo de profesional (FK -> ProfessionalType.id)',
                references: {
                    model: 'ProfessionalType',
                    key: 'id',
                },
            },
            isEnabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si este tipo de profesional está habilitado en este país',
            },
            allowRegister: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si se permite el registro para este tipo de profesional en este país',
            },
            allowBusiness: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                comment: 'Indica si se permite realizar negocios para este tipo de profesional en este país',
            },
            created_at: {
                type: DataTypes.DATE,
                comment: 'Fecha y hora de creación del registro',
            },
            updated_at: {
                type: DataTypes.DATE,
                comment: 'Fecha y hora de la última actualización',
            },
        },
        {
            tableName: 'CountryProfessionalType',
            freezeTableName: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            indexes: [
                {
                    unique: true,
                    fields: ['countryCode', 'professionalTypeId']
                }
            ]
        }
    );

    return CountryProfessionalType;
};
