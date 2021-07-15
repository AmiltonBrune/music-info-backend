module.exports = (sequelize, DataTypes) => {
  const ProfilesPermissions = sequelize.define('ProfilesPermissions', {
    ProfileId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Profiles',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
    PermissionId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'Permissions',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  })

  return ProfilesPermissions
}
