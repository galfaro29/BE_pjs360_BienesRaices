import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo StaffProfile.
     * Almacena el perfil profesional del personal interno (managers)
     * que trabajan bajo contratos de servicios profesionales.
     */
    const StaffProfile = sequelize.define(
        'StaffProfile',
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                comment: 'ID del usuario base (User). Identificador único del perfil de staff',
                references: {
                    model: 'User',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            firstName: {
                type: DataTypes.STRING(150),
                allowNull: false,
                comment: 'Nombre(s) del miembro del staff',
            },

            documentType: {
                type: DataTypes.ENUM('ID', 'PASSPORT', 'DIMEX'),
                allowNull: false,
                defaultValue: 'ID',
                //comment: 'Tipo de documento de identificación (ID, PASSPORT o DIMEX)',
            },

            documentNumber: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'Número de documento de identificación único',
            },

            phone: {
                type: DataTypes.STRING(20),
                allowNull: true,
                comment: 'Número de teléfono de contacto',
            },

            contractType: {
                type: DataTypes.ENUM('professional_services', 'other'),
                allowNull: false,
                defaultValue: 'professional_services',
                //comment: 'Tipo de contrato (professional_services u otros)',
            },

            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                comment: 'Fecha de inicio del contrato de servicios',
            },

            endDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                comment: 'Fecha de finalización del contrato (si aplica)',
            },

            feeType: {
                type: DataTypes.ENUM('hourly', 'fixed', 'per_ticket'),
                allowNull: false,
                defaultValue: 'fixed',
                //comment: 'Modalidad de pago (por hora, tarifa fija, o por servicio/ticket)',
            },

            feeAmount: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
                comment: 'Monto pactado según la modalidad de pago',
            },

            ndaSigned: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: 'Indica si el manager ha firmado el acuerdo de confidencialidad (NDA)',
            },

            ndaSignedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: 'Fecha y hora en que se firmó el NDA',
            },

            position: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: 'manager',
                comment: 'Cargo o posición que ocupa en la organización',
            },
            profileImage: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "URL o path de la imagen de perfil del colaborador"
            },
            status: {
                type: DataTypes.ENUM('active', 'suspended', 'terminated'),
                allowNull: false,
                defaultValue: 'active',
                //comment: 'Estado administrativo del miembro del staff',
            },
        },
        {
            tableName: 'StaffProfile',
            freezeTableName: true,
            timestamps: true,
            comment: 'Perfil de personal bajo contrato de servicios profesionales',
        }
    );

    return StaffProfile;
};
