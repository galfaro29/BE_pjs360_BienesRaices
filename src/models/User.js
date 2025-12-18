import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      customId: {
        type: DataTypes.STRING(50),
        allowNull: false, // obligatorio porque se asignará desde el controlador
        comment: 'Código personalizado',
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      token: DataTypes.STRING,
      confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM('admin', 'professional', 'client'),
        allowNull: false,
        defaultValue: 'client',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      locale: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'es',
      },
    },
    {
      tableName: 'User', // 👈 nombre exacto de la tabla
      freezeTableName: true, // 👈 evita pluralizar
      timestamps: true, // 👈 no crea createdAt / updatedAt
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      scopes: {
        eliminarPassword: {
          attributes: {
            exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt'],
          },
        },
      },
    }
  );



  // Método de instancia para verificar contraseña
  User.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};