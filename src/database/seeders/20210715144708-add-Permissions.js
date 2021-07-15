module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Permissions', [
      {
        permissionCode: 'all',
        description: 'Grants access to all features.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        permissionCode: 'crud_Users',
        description:
          'Allows the creation, reading, modification and deletion of users.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Permissions', null, {})
  },
}
