const { bulkCreate, remove } = require('../index')

exports.bulkCreateUsersProfiles = (records) => {
  return bulkCreate('UsersProfiles', records)
}

exports.removeUsersProfilesByUserId = (UserId) => {
  return remove('UsersProfiles', { where: { UserId } })
}
