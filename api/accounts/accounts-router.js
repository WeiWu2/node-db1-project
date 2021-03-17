const router = require('express').Router()
const Accounts = require('./accounts-model')
const {checkAccountId,  checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try{
   const accountData = await Accounts.getAll()
    res.json(accountData)
  }
  catch(err){
    next(err)
  }
})

router.get('/:id',checkAccountId, (req, res, next) => {
    Accounts.getById(req.params.id)
    .then((account) => {
      res.json(account)
    })
    .catch(next)
})

router.post('/',checkAccountPayload, checkAccountNameUnique ,(req, res, next) => {
  Accounts.create(req.body)
  .then((account) => {
    res.status(201).json(account)
  })
  .catch(next)
  
})

router.put('/:id',checkAccountPayload,checkAccountId ,(req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
  .then((account) => {
      res.json(account)
  })
  .catch(next)
});

router.delete('/:id',checkAccountId, (req, res, next) => {
    Accounts.deleteById(req.params.id)
    .then((account) => {
      res.json(account)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
