import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      customId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment:
          'Identificador personalizado del usuario (ej. CLI-0001, PRO-0005, ADM-0001)',
      },

      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: 'Nombre visible del usuario',
      },

      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: { isEmail: true },
        comment: 'Correo electrónico del usuario (único en el sistema)',
      },

      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: 'Contraseña encriptada del usuario',
      },

      token: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Token temporal para confirmación de cuenta o recuperación de contraseña',
      },

      confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indica si el usuario ha confirmado su cuenta mediante email',
      },

      confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Fecha y hora en que el usuario confirmó su cuenta',
      },

      role: {
        type: DataTypes.ENUM('admin', 'manager', 'finance', 'operation', 'professional', 'client'),
        allowNull: false,
        defaultValue: 'client',
        //comment: 'Rol del usuario dentro del sistema (admin, manager, finance, operations, professional, client)',
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Indica si la cuenta del usuario está activa para operar en el sistema',
      },

      locale: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'es',
        comment: 'Idioma preferido del usuario para la interfaz y comunicaciones',
      },

      countryCode: {
        type: DataTypes.STRING(5),
        allowNull: true,
        comment: 'Código del país asociado al usuario (referencia a Country.code)',
        references: {
          model: "Country",
          key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: 'User',
      freezeTableName: true, // evita pluralización automática
      timestamps: true,      // incluye createdAt / updatedAt
      comment:
        'Entidad base de autenticación e identidad del sistema',
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
            exclude: [
              'password',
              'token',
              'confirmado',
              'createdAt',
              'updatedAt',
            ],
          },
        },
      },
    }
  );

  /**
   * Método de instancia para verificar una contraseña
   * comparándola con el hash almacenado.
   */
  User.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
}; 