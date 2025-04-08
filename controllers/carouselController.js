const Carousel = require('../models/Carousel');
const { verifyToken } = require('./authController');

// Create carousel item
exports.createItem = async (req, res) => {
  try {
    const carouselItem = new Carousel(req.body);
    await carouselItem.save();
    res.status(201).json(carouselItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all carousel items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Carousel.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update carousel item
exports.updateItem = async (req, res) => {
  try {
    const item = await Carousel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete carousel item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Carousel.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};