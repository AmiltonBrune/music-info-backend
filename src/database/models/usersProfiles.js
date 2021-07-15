module.exports = (sequelize, DataTypes) => {
  const UsersProfiles = sequelize.define('UsersProfiles', {
    ProfileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Profiles',
        key: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
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

  return UsersProfiles
}
