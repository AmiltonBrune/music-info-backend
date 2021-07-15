const { encrypt } = require('../../presenters/encryptation')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: process.env.MASTER_USER_NAME,
        email: process.env.MASTER_USER_EMAIL,
        password: encrypt(process.env.MASTER_USER_PASSWORD),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface) => {
    const { id } = await queryInterface.rawSelect(
      'Users',
      { where: { email: process.env.MASTER_USER_EMAIL } },
      ['id']
    )

    return queryInterface.bulkDelete('Users', { id }, {})
  },
}
