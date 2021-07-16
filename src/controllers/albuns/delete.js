const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const { deleteAlbuns } = require('../../database/repository/albuns')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/album/:id'
exports.method = 'delete'
exports.middleware = [validateErrorBody]
exports.authenticate = true
exports.permission = 'crud_Albuns'

exports.handler = async (req, res) => {
  try {
    await deleteAlbuns(req.params.id)

    return res.status(status.OK).json({
      title: 'Deleted album.',
      message: 'Successfully deleted album.',
    })
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error removing album.',
      })
    )
  }
}
