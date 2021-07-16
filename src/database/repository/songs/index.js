const {
  bulkCreate,
  create,
  findAll,
  findAllPaginate,
  findOne,
  update,
  remove,
} = require('../index')

exports.createSongs = ({
  name,
  gender,
  releaseYear,
  artistName,
  letter,
  UserId,
}) => {
  return create('Songs', {
    name,
    gender,
    releaseYear,
    artistName,
    letter,
    UserId,
  })
}

exports.updateSongs = ({
  id,
  name,
  gender,
  releaseYear,
  artistName,
  letter,
  UserId,
}) => {
  return update(
    'Songs',
    { where: { id } },
    { name, gender, releaseYear, artistName, letter, UserId }
  )
}

exports.deleteSongs = (id) => {
  return remove('Songs', { where: { id } })
}

exports.findAllSongss = (UserId) => {
  return findAll('Songs', { where: { UserId } })
}

exports.findAllSongssPaginate = (page, UserId) => {
  return findAllPaginate('Songs', { where: { UserId } }, page)
}

exports.findSongsById = (id) => {
  return findOne('Songs', {
    where: { id },
  })
}

exports.bulkCreateSongs = (Songs) => {
  return bulkCreate('Songs', Songs)
}
