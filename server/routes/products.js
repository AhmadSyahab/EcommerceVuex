const express = require('express');
const router = express.Router();
const Controller = require('../controllers/product.js')

/* GET Product */
router.get('/', Controller.findAll);

/* Create Product */
router.post('/', Controller.create);

/* Delete Product */
router.delete('/:productId', Controller.destroy);

/* Edit Product */
router.put('/:productId', Controller.update);

module.exports = router;
