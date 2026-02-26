import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo StaffPaymentInfo.
     * Información financiera y bancaria sensible segregada por seguridad.
     */
    const StaffPaymentInfo = sequelize.define(
        'StaffPaymentInfo',
        {
            staffId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                comment: 'ID del staff asociado (referencia a StaffProfile.userId)',
                references: {
                    model: 'StaffProfile',
                    key: 'userId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            bankName: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: 'Nombre de la entidad bancaria para depósitos',
            },

            accountNumber: {
                type: DataTypes.STRING(100),
                allowNull: true,
                comment: 'Número de cuenta bancaria o IBAN',
            },

            accountHolder: {
                type: DataTypes.STRING(200),
                allowNull: true,
                comment: 'Nombre completo del titular de la cuenta',
            },

            currency: {
                type: DataTypes.ENUM('CRC', 'USD'),
                allowNull: false,
                defaultValue: 'CRC',
                //comment: 'Moneda en la que se realizan los pagos (CRC o USD)',
            },

            sinpePhone: {
                type: DataTypes.STRING(20),
                allowNull: true,
                comment: 'Número de teléfono para pagos móviles (SINPE en CR)',
            },
        },
        {
            tableName: 'StaffPaymentInfo',
            freezeTableName: true,
            timestamps: true,
            comment: 'Datos financieros y bancarios del personal interno',
        }
    );

    return StaffPaymentInfo;
};
