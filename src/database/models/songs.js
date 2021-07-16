module.exports = (sequelize, DataTypes) => {
  const Songs = sequelize.define('Songs', {
    name: {
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
    letter: {
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

  Songs.associate = (models) => {
    Songs.belongsToMany(models.Albuns, {
      through: 'SongsAlbuns',
      as: 'Albuns',
    })
  }

  return Songs
}
