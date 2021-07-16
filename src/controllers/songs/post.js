const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const { validateBodySong, receiveSongTratmentForPost } = require('./case')
const { createSongs } = require('../../database/repository/songs')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/song'
exports.method = 'post'
exports.middleware = [validateBodySong, validateErrorBody]
exports.authenticate = true
exports.permission = 'crud_Songs'

exports.handler = async ({ body, user }, res) => {
  try {
    const cleanSongForPost = receiveSongTratmentForPost(body, user)

    const { id, name, createdAt, updatedAt } = await createSongs(
      cleanSongForPost
    )

    return res.status(status.OK).json({ id, name, createdAt, updatedAt })
  } catch (error) {
    console.log('====================================')
    console.log('error -->', error)
    console.log('====================================')
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error add song.',
      })
    )
  }
}
