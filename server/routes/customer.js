const express = require('express')
const router = express.Router();
const customerConroller = require('../controllers/customerController')

/**
 * Customer Routes
 */
router.get('/', customerConroller.homepage);
router.get('/about', customerConroller.aboutPage);

router.get('/add', customerConroller.addCustomer);
router.post('/add', customerConroller.postCustomer);

router.get('/view/:id', customerConroller.view);

router.get('/edit/:id', customerConroller.edit);
router.put('/edit/:id', customerConroller.editPost);

router.delete('/edit/:id', customerConroller.deleteCustomer);

router.post('/search', customerConroller.searchCustomer);



module.exports = router;