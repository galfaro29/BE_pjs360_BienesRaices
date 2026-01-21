import { DataTypes } from 'sequelize';

export default (sequelize) => {
    /**
     * Catálogo de Tipos de Propiedad.
     * Ejemplos: Casa, Departamento, Terreno, Oficina, Bodega.
     */
    const PropertyType = sequelize.define(
        'PropertyType',
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'Nombre del tipo de propiedad (ej. Casa, Departamento)'
            },
        },
        {
            tableName: 'PropertyTypes',
            freezeTableName: true,
            timestamps: false,
        }
    );

    return PropertyType;
};
