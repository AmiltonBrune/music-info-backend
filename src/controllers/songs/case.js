const { body } = require('express-validator')
const { httpStatus: status } = require('../../presenters/statusCodes')
const { findSongsById } = require('../../database/repository/songs')
const { getErrorsDefault } = require('../../presenters/handle')

exports.validateBodySong = [
  body('name').isString().notEmpty(),
  body('gender').isString().notEmpty(),
  body('releaseYear').isString().notEmpty(),
  body('artistName').isString().notEmpty(),
  body('letter').isString().notEmpty(),
]

exports.receiveSongTratmentForPost = (body, user) => ({
  name: body.name,
  gender: body.gender,
  releaseYear: body.releaseYear,
  artistName: body.artistName,
  letter: body.letter,
  UserId: user.id,
})

exports.receiveSongTratmentForPut = (body, id, user) => ({
  id,
  name: body.name,
  gender: body.gender,
  releaseYear: body.releaseYear,
  artistName: body.artistName,
  letter: body.letter,
  UserId: user.id,
})

exports.checkExistsSongId = async (req, res, next) => {
  const previuousId = await findSongsById(req.params.id)

  if (!previuousId)
    return res.status(status.BAD_REQUEST).json(
      getErrorsDefault({
        title: 'Song not found!',
        message: 'Song not found, provide a valid id.',
      })
    )

  return next()
}
