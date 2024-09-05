const express = require('express')
const router = express.Router();
const customerConroller = require('../controllers/customerController')

/**
 * Customer Routes
 */
router.get('/', customerConroller.homepage);

router.get('/add', customerConroller.addCustomer);
router.post('/add', customerConroller.postCustomer);

router.get('/view/:id', customerConroller.view);

router.get('/edit/:id', customerConroller.edit);

module.exports = router;