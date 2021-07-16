module.exports = (sequelize, DataTypes) => {
  const SongsAlbuns = sequelize.define('SongsAlbuns', {
    AlbunId: {
      type: DataTypes.UUID,
    },
    SongId: {
      type: DataTypes.UUID,
    },
  })

  return SongsAlbuns
}
