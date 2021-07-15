const {
  getProfilesAndPermissionsOfUser,
} = require('../database/repository/users')
const { httpStatus: status } = require('./statusCodes')

const getPermissions = (permissions) => {
  return permissions.map((permission) => {
    return permission.permissionCode
  })
}

const permissionArrayIncludesPermissions = (userPermissions, permission) => {
  userPermissions = getPermissions(userPermissions)

  for (const perm of permission) {
    if (userPermissions.includes(perm)) {
      return true
    }

    return false
  }
}

exports.validatePermission = (permission) => {
  return async (req, res, next) => {
    const { id } = req.user
    const user = await getProfilesAndPermissionsOfUser({ id })

    if (!user) {
      return res.status(status.BAD_REQUEST).json({
        title: 'Invalid users!',
        message: 'There is no registered user for this id.',
      })
    }

    const profilesWithPermission = user.Profiles.find((profile) => {
      return (
        getPermissions(profile.Permissions).includes('all') ||
        (typeof permission === 'string'
          ? getPermissions(profile.Permissions).includes(permission)
          : permissionArrayIncludesPermissions(profile.Permissions, permission))
      )
    })

    if (!profilesWithPermission) {
      return res.status(status.BAD_REQUEST).json({
        title: 'Without permission!',
        message: 'Unauthorized operation for user profile.',
      })
    }

    next()
  }
}
