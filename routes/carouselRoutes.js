const express = require('express');
const { verifyToken } = require('../controllers/authController');
const {
  createItem,
  getAllItems,
  updateItem,
  deleteItem
} = require('../controllers/carouselController');

const router = express.Router();

// Apply auth middleware to all carousel routes
router.use(verifyToken);

// Carousel routes
router.route('/')
  .get(getAllItems)
  .post(createItem);

router.route('/:id')
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;