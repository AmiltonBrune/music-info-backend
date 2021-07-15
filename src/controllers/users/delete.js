const { httpStatus } = require('../../presenters/statusCodes')
const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const { removeUser } = require('../../database/repository/users')
const { removeProfilesOfUsers } = require('./case')

exports.path = '/user/:id'
exports.method = 'delete'
exports.middleware = [validateErrorBody]
exports.authenticate = true
exports.permission = 'crud_Users'

exports.handler = async ({ params: { id } }, res) => {
  try {
    await removeProfilesOfUsers(id)
    await removeUser(id)

    return res.status(httpStatus.OK).json({
      title: 'User deleted.',
      message: 'User deleted successfully.',
    })
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error removing user.',
      })
    )
  }
}
