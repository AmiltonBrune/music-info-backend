const { httpStatus } = require('../../presenters/statusCodes')
const {
  normalizePatterResponse,
  getErrorsDefault,
} = require('../../presenters/handle')
const { findUserById } = require('../../database/repository/users')

exports.path = '/user/:id'
exports.method = 'get'
exports.middleware = []
exports.authenticate = true
exports.permission = 'crud_Users'

exports.handler = async ({ params: { id } }, res) => {
  try {
    const user = await findUserById(id)

    return res.status(httpStatus.OK).json(normalizePatterResponse(user))
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error find user.',
      })
    )
  }
}
