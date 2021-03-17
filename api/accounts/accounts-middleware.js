const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  if(!req.body.name || !req.body.budget)
    res.status(400).json({message:'name and budget are required'})
    else if (typeof req.body.name !== 'string')
    res.status(400).json({message:'name of account must be a string'})
   else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100)  
    res.status(400).json({message:'name of account must be between 3 and 100'})
    else if (!Number(req.body.budget))
    res.status(400).json({message:'budget of account must be a number'})
    else if (req.body.budget > 1000000 || req.body.budget < 0)
    res.status(400).json({message:'budget of account is too large or too small'})
    else
      { 
        req.body.name = req.body.name.trim()
        next()
      }
    
}

exports.checkAccountNameUnique = async (req, res, next) => {
    try{
        const name = await Accounts.getName(req.body.name.trim())
            if(name)
            res.status(400).json({message:'that name is taken'})
              else
              next()
    }
    catch(err){
      next(err)
    }
}

exports.checkAccountId = async (req, res, next) => {
  Accounts.getById(req.params.id)
  .then((account) => {
      if(!account)
      res.status(404).json({message:'account not found'})
      else
        next();
  })
  .catch((err) => {
    next(err)
  })
}
