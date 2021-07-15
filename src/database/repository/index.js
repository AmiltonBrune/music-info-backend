const databaseFn = require('../models')
const models = databaseFn
const { Op, QueryTypes } = require('sequelize')

exports.models = models

/**
 * @function
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @returns {Promise} Result - resultado da query
 */

exports.findAll = (table, query) => models[table].findAll(query)

/**
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} options - Opção de retorno de objeto
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */

exports.findOne = async (table, query) => models[table].findOne(query)

/**
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {Object} data - Dados que será inserido no banco de dados.
 * @returns {Promise} Result - resultado da inserção ou stack de new Error()
 */

exports.create = (table, data) => models[table].create(data, { raw: true })

/**
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {Array<Object>} data - Dados que serão inseridos no banco de dados.
 * @returns {Promise} Result - resultado da inserção ou stack de new Error()
 */
exports.bulkCreate = (table, data) =>
  models[table].bulkCreate(data, {
    returning: true,
    ignoreDuplicates: true,
  })

/**
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {Object} data - Dados que será alterado
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */

exports.update = async (table, query, data) => models[table].update(data, query)

/**
 * @function
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @returns {Promise} Result - resultado do update ou stack de new Error()
 */

exports.remove = async (table, query) => models[table].destroy(query)

/**
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {Object} query - Query inserida na pesquisa do banco de dados.
 * @param  {number} pages - Pages a pagina.
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */
exports.findAllPaginate = async (table, query, pages) => {
  const Model = models[table]
  const HelperPaginate = require('../../presenters/pagination')(Model)
  const page = await HelperPaginate.countAll(pages, query)
  return HelperPaginate.listAll(query)(page)
}

/**
 * @param  {String} table - O nome da tabela que irá buscar no banco de dados
 * @param  {String} value - valor a ser considerado na consulta genérica
 * @param  {Array<String>} properties - Array contendo as propriedades do modelo que serão utilizadas na consulta
 * @param  {Array<Array<String>>} order - Array contendo a ordenação a ser aplicada no retorno da consulta
 * @param  {Number} limit - quantidade limite de dados que serão retornados na consulta (default 10)
 * @param {Object} complementaryWhere - objeto com as propriedades extras para a query
 * @param {any} attributes - atributos a serem retornados ou desconsiderados no retorno da consulta
 * @returns {Promise} Result - resultado da query ou stack de new Error()
 */
exports.findGeneric = async (
  table,
  value,
  properties,
  order,
  limit,
  complementaryWhere,
  attributes
) => {
  value = { [Op.iLike]: `%${value}%` }

  const query = {
    where: {
      [Op.or]: properties.map((property) => {
        const field = {}
        field[property] = value
        return field
      }),
    },
    order,
    limit: limit || 10,
    attributes,
  }

  if (complementaryWhere) {
    Object.getOwnPropertyNames(complementaryWhere).forEach((property) => {
      query.where[property] = complementaryWhere[property]
    })
  }

  return models[table].findAll(query)
}

exports.getQuery = (query) => {
  let queryOptions = require(`../queries/${query}`)
  return queryOptions[process.env.DATABASE_TYPE] || queryOptions.default
}

exports.runQuery = async (query, replacements, type = 'SELECT') => {
  return models.sequelize.query(this.getQuery(query), {
    replacements,
    type: QueryTypes[type],
  })
}
