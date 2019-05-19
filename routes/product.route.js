const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

router.post('/create', product_controller.product_create);

router.get('/list', product_controller.product_list);

router.get('/:id', product_controller.product_details);

router.post('/:id/update', product_controller.product_update);

router.get('/:id/delete', product_controller.product_delete);

module.exports = router;