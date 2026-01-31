'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AgentSubscriptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      agentUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      planType: {
        type: Sequelize.ENUM('AGENTE_PRO', 'AGENCIA'),
        defaultValue: 'AGENTE_PRO',
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('ACTIVA', 'EXPIRADA'),
        defaultValue: 'ACTIVA',
        allowNull: false
      },
      maxActiveProps: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      maxClients: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AgentSubscriptions');
  }
};
