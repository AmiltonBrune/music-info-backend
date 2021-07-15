module.exports = {
  up: async (queryInterface) => {
    const userId = await queryInterface.rawSelect(
      'Users',
      { where: { email: process.env.MASTER_USER_EMAIL } },
      ['id']
    )
    const profileId = await queryInterface.rawSelect(
      'Profiles',
      { where: { name: 'master' } },
      ['id']
    )

    return queryInterface.bulkInsert('UsersProfiles', [
      {
        UserId: userId,
        ProfileId: profileId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('UsersProfiles', null, {})
  },
}
