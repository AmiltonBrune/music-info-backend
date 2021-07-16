const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const {
  validateBodySong,
  receiveSongTratmentForPut,
  checkExistsSongId,
} = require('./case')
const { updateSongs } = require('../../database/repository/songs')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/song/:id'
exports.method = 'put'
exports.middleware = [validateBodySong, validateErrorBody, checkExistsSongId]
exports.authenticate = true
exports.permission = 'crud_Songs'

exports.handler = async (req, res) => {
  try {
    const receiveTratament = receiveSongTratmentForPut(
      req.body,
      req.params.id,
      req.user
    )

    await updateSongs({ ...receiveTratament })

    return res.status(status.OK).json({
      title: 'Updated music.',
      message: 'Music updated successfully.',
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
