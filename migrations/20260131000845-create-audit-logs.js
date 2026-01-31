'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuditLogs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      entityName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      entityId: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      action: {
        type: Sequelize.ENUM('INSERT', 'UPDATE', 'DELETE', 'SOFT_DELETE', 'RESTORE'),
        allowNull: false
      },
      oldValues: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      newValues: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      source: {
        type: Sequelize.ENUM('USER', 'ADMIN', 'AGENT', 'SYSTEM'),
        defaultValue: 'SYSTEM'
      },
      reason: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      ipAddress: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      userAgent: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('AuditLogs', ['entityName']);
    await queryInterface.addIndex('AuditLogs', ['entityId']);
    await queryInterface.addIndex('AuditLogs', ['userId']);
    await queryInterface.addIndex('AuditLogs', ['createdAt']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AuditLogs');
  }
};
