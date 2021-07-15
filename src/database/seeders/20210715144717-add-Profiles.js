module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Profiles', [
      {
        name: 'master',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Profiles', null, {})
  },
}
