const express = require('express');
const { verifyToken } = require('../controllers/authController');
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

// Apply auth middleware to all order routes
router.use(verifyToken);

// Order routes
router.route('/')
  .get(getAllOrders)
  .post(createOrder);

router.route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder);

module.exports = router;