const { getErrorsDefault } = require('../../presenters/handle')
const { findAllAlbunsPaginate } = require('../../database/repository/albuns')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/albuns'
exports.method = 'get'
exports.middleware = []
exports.authenticate = true
exports.permission = 'crud_Albuns'

exports.handler = async ({ query: { page }, user }, res) => {
  try {
    const albuns = await findAllAlbunsPaginate(page || 1, user.id)

    return res.status(status.OK).json(albuns)
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error list album.',
      })
    )
  }
}
