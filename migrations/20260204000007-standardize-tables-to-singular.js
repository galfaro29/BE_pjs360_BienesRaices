
/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface, Sequelize) {
        const renames = [
            { old: 'Properties', new: 'Property' },
            { old: 'PropertyTypes', new: 'PropertyType' },
            { old: 'PropertyOfferTypes', new: 'PropertyOfferType' },
            { old: 'Cities', new: 'City' },
            { old: 'States', new: 'State' },
            { old: 'PropertyImages', new: 'PropertyImage' },
            { old: 'PropertyPublications', new: 'PropertyPublication' },
            { old: 'AgentSubscriptions', new: 'AgentSubscription' },
            { old: 'ClientSubscriptions', new: 'ClientSubscription' },
            { old: 'AuditLogs', new: 'AuditLog' },
            { old: 'PropertyResidentialDetails', new: 'PropertyResidentialDetail' },
            { old: 'PropertyLandDetails', new: 'PropertyLandDetail' },
            { old: 'PropertyOfficeDetails', new: 'PropertyOfficeDetail' },
            { old: 'PropertyWarehouseDetails', new: 'PropertyWarehouseDetail' },
            { old: 'PropertyCommercialDetails', new: 'PropertyCommercialDetail' },
            { old: 'PropertyBuildingDetails', new: 'PropertyBuildingDetail' },
        ];

        for (const { old: oldName, new: newName } of renames) {
            try {
                await queryInterface.renameTable(oldName, newName);
            } catch (error) {
                console.log(`Table ${oldName} might not exist or ${newName} already exists:`, error.message);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        const renames = [
            { old: 'Properties', new: 'Property' },
            { old: 'PropertyTypes', new: 'PropertyType' },
            { old: 'PropertyOfferTypes', new: 'PropertyOfferType' },
            { old: 'Cities', new: 'City' },
            { old: 'States', new: 'State' },
            { old: 'PropertyImages', new: 'PropertyImage' },
            { old: 'PropertyPublications', new: 'PropertyPublication' },
            { old: 'AgentSubscriptions', new: 'AgentSubscription' },
            { old: 'ClientSubscriptions', new: 'ClientSubscription' },
            { old: 'AuditLogs', new: 'AuditLog' },
            { old: 'PropertyResidentialDetails', new: 'PropertyResidentialDetail' },
            { old: 'PropertyLandDetails', new: 'PropertyLandDetail' },
            { old: 'PropertyOfficeDetails', new: 'PropertyOfficeDetail' },
            { old: 'PropertyWarehouseDetails', new: 'PropertyWarehouseDetail' },
            { old: 'PropertyCommercialDetails', new: 'PropertyCommercialDetail' },
            { old: 'PropertyBuildingDetails', new: 'PropertyBuildingDetail' },
        ];

        // Revert logic (swap old/new)
        for (const { old: oldName, new: newName } of renames) {
            try {
                await queryInterface.renameTable(newName, oldName);
            } catch (error) {
                console.log(`Revert failed for ${newName} -> ${oldName}:`, error.message);
            }
        }
    }
};
