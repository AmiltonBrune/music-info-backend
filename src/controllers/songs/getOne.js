const {
  normalizePatterResponse,
  getErrorsDefault,
} = require('../../presenters/handle')
const { checkExistsSongId } = require('./case')
const { findSongsById } = require('../../database/repository/songs')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/song/:id'
exports.method = 'get'
exports.middleware = [checkExistsSongId]
exports.authenticate = true
exports.permission = 'crud_Songs'

exports.handler = async ({ params: { id } }, res) => {
  try {
    const song = await findSongsById(id)

    return res.status(status.OK).json(normalizePatterResponse(song))
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error find song.',
      })
    )
  }
}
