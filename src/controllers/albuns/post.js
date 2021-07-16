const {
  validateErrorBody,
  getErrorsDefault,
} = require('../../presenters/handle')
const { validateBodyAlbum, receiveAlbumTratmentForPost } = require('./case')
const { createAlbuns } = require('../../database/repository/albuns')
const { httpStatus: status } = require('../../presenters/statusCodes')

exports.path = '/album'
exports.method = 'post'
exports.middleware = [validateBodyAlbum, validateErrorBody]
exports.authenticate = true
exports.permission = 'crud_Albuns'

exports.handler = async ({ body, user }, res) => {
  try {
    const cleanAlbumForPost = receiveAlbumTratmentForPost(body, user)

    const { id, name, createdAt, updatedAt } = await createAlbuns(
      cleanAlbumForPost
    )

    return res.status(status.OK).json({ id, name, createdAt, updatedAt })
  } catch (error) {
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Error',
        message: 'Error add album.',
      })
    )
  }
}
