const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const { deleteSongs } = require('../../database/repository/songs')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/song/:id'
exports.method = 'delete'
exports.middleware = [validateErrorBody]
exports.authenticate = true
exports.permission = 'crud_Songs'

exports.handler = async (req, res) => {
  try {
    await deleteSongs(req.params.id)

    return res.status(status.OK).json({
      title: 'Deleted music.',
      message: 'Successfully deleted music.',
    })
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error removing music.',
      })
    )
  }
}
