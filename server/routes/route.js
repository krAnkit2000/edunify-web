const express = require('express');
const router = express.Router();
const school = require('../service/script');


/* GET . */
router.get('/', async function(req, res, next) {
  try {
    res.json(await school.getListByParams(req.query.page));
  } catch (err) {
    console.error(`Error while getting school `, err.message);
    next(err);
  }
});


// post 
router.post('/', async function(req, res, next) {
  try {
    console.log('Form Data', req.body);
    res.json(await school.create(req.body));
  } catch (err) {
    console.error(`Error while creating school`, err.message);
    next(err);
  }
});




// img upload 


// 



router.put('/:id', async function(req, res, next) {
  try {
    res.json(await school.update(req.body));
  } catch (err) {
    console.error(`Error while updating school`, err.message);
    next(err);
  }
});


module.exports = router;