import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo StaffPayment.
     * Registro histórico de los pagos realizados al personal contratado.
     */
    const StaffPayment = sequelize.define(
        'StaffPayment',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: 'Identificador único del registro de pago',
            },

            staffId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del perfil de staff al que se le realiza el pago',
                references: {
                    model: 'StaffProfile',
                    key: 'userId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            invoiceNumber: {
                type: DataTypes.STRING(50),
                allowNull: true,
                comment: 'Número de factura electrónica emitida por el profesional',
            },

            invoiceDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                comment: 'Fecha de emisión de la factura profesional',
            },

            amount: {
                type: DataTypes.DECIMAL(12, 2),
                allowNull: false,
                comment: 'Monto total pagado según la factura o acuerdo',
            },

            paymentDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                comment: 'Fecha real en la que se efectuó el pago',
            },

            paymentMethod: {
                type: DataTypes.STRING(50),
                allowNull: true,
                comment: 'Método utilizado (Transferencia, SINPE, etc.)',
            },

            notes: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: 'Observaciones o detalles adicionales sobre el pago',
            },
        },
        {
            tableName: 'StaffPayment',
            freezeTableName: true,
            timestamps: true,
            comment: 'Historico de pagos a personal interno por servicios profesionales',
        }
    );

    return StaffPayment;
};
