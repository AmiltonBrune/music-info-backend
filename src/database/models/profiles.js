module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define('Profiles', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  })

  Profiles.associate = (models) => {
    Profiles.belongsToMany(models.Permissions, {
      through: models.ProfilesPermissions,
    })

    Profiles.belongsToMany(models.Users, {
      through: models.UsersProfiles,
    })
  }
  return Profiles
}
