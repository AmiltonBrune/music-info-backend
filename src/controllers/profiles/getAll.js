const { getErrorsDefault } = require('../../presenters/handle')
const { findAllProfiles } = require('../../database/repository/profiles')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/profiles'
exports.method = 'get'
exports.middleware = []
exports.authenticate = true
exports.permission = 'crud_profiles'

exports.handler = async (_, res) => {
  try {
    const profiles = await findAllProfiles()

    return res.status(status.OK).json(profiles)
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error list profiles.',
      })
    )
  }
}
