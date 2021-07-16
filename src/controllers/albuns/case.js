const { body } = require('express-validator')
const { httpStatus: status } = require('../../presenters/statusCodes')
const { findAlbunsById } = require('../../database/repository/albuns')
const { getErrorsDefault } = require('../../presenters/handle')

exports.validateBodyAlbum = [
  body('name').isString().notEmpty(),
  body('gender').isString().notEmpty(),
  body('artist').isString().notEmpty(),
  body('releaseYear').isString().notEmpty(),
  body('artistName').isString().notEmpty(),
  body('photo').isString().notEmpty(),
]

exports.receiveAlbumTratmentForPost = (body, user) => ({
  name: body.name,
  gender: body.gender,
  artist: body.artist,
  releaseYear: body.releaseYear,
  artistName: body.artistName,
  photo: body.photo,
  UserId: user.id,
})

exports.receiveAlbumTratmentForPut = (body, id, user) => ({
  id,
  name: body.name,
  gender: body.gender,
  artist: body.artist,
  releaseYear: body.releaseYear,
  artistName: body.artistName,
  photo: body.photo,
  UserId: user.id,
})

exports.checkExistsAlbumId = async (req, res, next) => {
  const previuousId = await findAlbunsById(req.params.id)

  if (!previuousId)
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Album not found!',
        message: 'Album not found, provide a valid id.',
      })
    )

  return next()
}
