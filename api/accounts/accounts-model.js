const db = require('../../data/db-config')


const getAll = () => {
 return db('accounts')
}

const getById = id => {
  return db('accounts').where('id', id).select('name', 'budget').first()
}

const create = async account => {
  const [id] = await db('accounts').insert(account, ['id'])
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').where({id}).update(account)
  return getById(id)
}

const deleteById = async id => {
  const deletedAccount = await getById(id)
  await db('accounts').where({id}).delete()
  return deletedAccount
}

const getName = name => {
    return db('accounts').where('name', name).select('name').first()
}
module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getName
}
