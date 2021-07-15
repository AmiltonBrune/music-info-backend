module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  })

  Users.associate = (models) => {
    Users.belongsToMany(models.Profiles, {
      through: models.UsersProfiles,
    })
  }

  return Users
}
