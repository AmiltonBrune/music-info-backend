const { create, remove } = require('../index')

exports.createSongsAlbuns = ({ AlbunId, SongId }) => {
  return create('SongsAlbuns', { AlbunId, SongId })
}

exports.deleteSongsAlbunsBySongId = (SongId) => {
  return remove('SongsAlbuns', { where: { SongId } })
}

exports.deleteSongAlbumbyAlbumId = (AlbunId) => {
  return remove('SongsAlbuns', { where: { AlbunId } })
}
