const models = require('../models')
const profiles = [
  {
    name: 'master',
    permissions: ['all'],
  },
  {
    name: 'user',
    permissions: ['crud_Users'],
  },
]

module.exports = {
  up: async (queryInterface) => {
    let profilePermissions = []

    for (const profile of profiles) {
      const ProfileId = await queryInterface.rawSelect(
        'Profiles',
        { where: { name: profile.name } },
        ['id']
      )

      const per = await queryInterface.select(
        models.Permissions,
        'Permissions',
        { where: { permissionCode: profile.permissions } }
      )

      profilePermissions = profilePermissions.concat(
        per.map((p) => {
          return {
            ProfileId,
            PermissionId: p.dataValues.id,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        })
      )
    }

    return queryInterface.bulkInsert('ProfilesPermissions', profilePermissions)
  },
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('ProfilesPermissions', null, {})
  },
}
