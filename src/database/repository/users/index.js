const {
  create,
  findAll,
  findOne,
  update,
  remove,
  findAllPaginate,
} = require('../index')
const models = require('../../models')

const includes = [
  {
    model: models.Profiles,
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
]

exports.findAllUsers = () => {
  return findAll('Users', {
    include: includes,
    attributes: { exclude: ['password'] },
  })
}

exports.createUser = ({ name, email, password }) => {
  return create('Users', {
    name,
    email,
    password,
  })
}

exports.findUserById = (id) => {
  return findOne('Users', {
    include: includes,
    where: { id },
    attributes: { exclude: ['password'] },
  })
}

exports.findUserByEmail = (email) => {
  return findOne('Users', {
    where: { email },
  })
}

exports.updateUser = ({ id, name, email, password }) => {
  return update('Users', { where: { id } }, { name, email, password })
}

exports.removeUser = (id) => {
  return remove('Users', { where: { id } })
}

exports.getProfilesAndPermissionsOfUser = (queryObject) => {
  return findOne('Users', {
    include: [
      {
        model: models['Profiles'],
        include: [
          {
            model: models['Permissions'],
          },
        ],
      },
    ],
    where: queryObject,
  })
}

exports.findAllUsersWithPaginate = (page) => {
  return findAllPaginate(
    'Users',
    {
      include: includes,
      order: [['name']],
      attributes: { exclude: ['password'] },
    },
    page
  )
}
