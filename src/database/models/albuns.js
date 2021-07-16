module.exports = (sequelize, DataTypes) => {
  const Albuns = sequelize.define('Albuns', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    artist: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    releaseYear: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    artistName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    photo: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  })

  Albuns.associate = (models) => {
    Albuns.belongsToMany(models.Songs, {
      through: 'SongsAlbuns',
      as: 'Songs',
    })
  }

  return Albuns
}
