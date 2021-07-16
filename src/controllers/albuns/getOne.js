const {
  normalizePatterResponse,
  getErrorsDefault,
} = require('../../presenters/handle')
const { checkExistsAlbumId } = require('./case')
const { findAlbunsById } = require('../../database/repository/albuns')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/album/:id'
exports.method = 'get'
exports.middleware = [checkExistsAlbumId]
exports.authenticate = true
exports.permission = 'crud_Albuns'

exports.handler = async ({ params: { id } }, res) => {
  try {
    const album = await findAlbunsById(id)

    return res.status(status.OK).json(normalizePatterResponse(album))
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error find album.',
      })
    )
  }
}
