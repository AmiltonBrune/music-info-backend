const { findAll, findOne } = require('../index')

exports.findAllProfiles = () => {
  return findAll('Profiles')
}

exports.findAllProfilesById = (id) => {
  return findAll('Profiles', { where: { id } })
}

exports.findProfileById = (id) => {
  return findOne('Profiles', { where: { id } })
}
