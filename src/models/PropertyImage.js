import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Modelo para la Galería de Imágenes de una Propiedad.
     * Permite tener N fotos por propiedad, ordenarlas y definir una portada.
     */
    const PropertyImage = sequelize.define(
        'PropertyImage',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            url: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: 'URL relativa o absoluta de la imagen almacenada'
            },
            isMain: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                comment: 'Define si es la imagen de portada de la propiedad'
            },
            order: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                comment: 'Orden de visualización en la galería'
            },
            description: {
                type: DataTypes.STRING(150),
                allowNull: true,
                comment: 'Descripción opcional (alt text)'
            }
        },
        {
            tableName: 'PropertyImage',
            freezeTableName: true,
            timestamps: true,
        }
    );

    return PropertyImage;
};
