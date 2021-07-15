const { httpStatus } = require('../../presenters/statusCodes')
const { getErrorsDefault } = require('../../presenters/handle')

const { findAllUsersWithPaginate } = require('../../database/repository/users')

exports.path = '/users'
exports.method = 'get'
exports.middleware = []
exports.authenticate = true
exports.permission = 'crud_Users'

exports.handler = async ({ query: { page } }, res) => {
  try {
    const users = await findAllUsersWithPaginate(page || 1)

    return res.status(httpStatus.OK).json(users)
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error list users.',
      })
    )
  }
}
