module.exports = (sequelize, DataTypes) => {
  const Permissions = sequelize.define('Permissions', {
    permissionCode: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  })

  Permissions.associate = (models) => {
    Permissions.belongsToMany(models.Profiles, {
      through: models.ProfilesPermissions,
    })
  }

  return Permissions
}
