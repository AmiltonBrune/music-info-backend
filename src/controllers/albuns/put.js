const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const {
  validateBodyAlbum,
  receiveAlbumTratmentForPut,
  checkExistsAlbumId,
} = require('./case')
const { updateAlbuns } = require('../../database/repository/albuns')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/album/:id'
exports.method = 'put'
exports.middleware = [validateBodyAlbum, validateErrorBody, checkExistsAlbumId]
exports.authenticate = true
exports.permission = 'crud_Albuns'

exports.handler = async (req, res) => {
  try {
    const receiveTratament = receiveAlbumTratmentForPut(
      req.body,
      req.params.id,
      req.user
    )

    await updateAlbuns({ ...receiveTratament })

    return res.status(status.OK).json({
      title: 'Updated album.',
      message: 'Album updated successfully.',
    })
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error updated song.',
      })
    )
  }
}
