const {
  bulkCreate,
  create,
  findAll,
  findAllPaginate,
  findOne,
  update,
  remove,
} = require('../index')

exports.createAlbuns = ({
  name,
  gender,
  releaseYear,
  artist,
  artistName,
  photo,
  UserId,
}) => {
  return create('Albuns', {
    name,
    gender,
    releaseYear,
    artist,
    artistName,
    photo,
    UserId,
  })
}

exports.updateAlbuns = ({
  id,
  name,
  gender,
  releaseYear,
  artist,
  artistName,
  photo,
  UserId,
}) => {
  return update(
    'Albuns',
    { where: { id } },
    { name, gender, releaseYear, artist, artistName, photo, UserId }
  )
}

exports.deleteAlbuns = (id) => {
  return remove('Albuns', { where: { id } })
}

exports.findAllAlbuns = (UserId) => {
  return findAll('Albuns', { where: { UserId } })
}

exports.findAllAlbunsPaginate = (page, UserId) => {
  return findAllPaginate('Albuns', { where: { UserId } }, page)
}

exports.findAlbunsById = (id) => {
  return findOne('Albuns', {
    where: { id },
  })
}

exports.bulkCreateAlbuns = (Albuns) => {
  return bulkCreate('Albuns', Albuns)
}
