import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo StaffRating.
     * Calificaciones internas otorgadas al personal de staff por su atención.
     */
    const StaffRating = sequelize.define(
        'StaffRating',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                comment: 'Identificador único de la calificación',
            },

            interactionId: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: 'Referencia a la interacción calificada',
                references: {
                    model: 'StaffInteraction',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            staffId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del perfil de staff calificado',
                references: {
                    model: 'StaffProfile',
                    key: 'userId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            raterType: {
                type: DataTypes.ENUM('client', 'professional'),
                allowNull: false,
                //comment: 'Tipo de usuario que califica (client, professional)',
            },

            raterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'ID del usuario que califica (userId si es cliente, id si es profesional)',
            },

            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 5,
                },
                comment: 'Puntuación otorgada (escala 1 a 5)',
            },

            comment: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: 'Comentario u observaciones opcionales del calificador',
            },
        },
        {
            tableName: 'StaffRating',
            freezeTableName: true,
            timestamps: true,
            updatedAt: false,
            comment: 'Calificaciones internas de desempeño del staff',
        }
    );

    return StaffRating;
};
