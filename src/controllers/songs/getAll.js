const { getErrorsDefault } = require('../../presenters/handle')
const { findAllSongssPaginate } = require('../../database/repository/songs')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/songs'
exports.method = 'get'
exports.middleware = []
exports.authenticate = true
exports.permission = 'crud_Songs'

exports.handler = async ({ query: { page }, user }, res) => {
  try {
    const songs = await findAllSongssPaginate(page || 1, user.id)

    return res.status(status.OK).json(songs)
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error list music.',
      })
    )
  }
}
