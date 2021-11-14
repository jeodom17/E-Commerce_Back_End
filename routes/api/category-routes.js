const router = require('express').Router();
const { Category, Product } = require('../../models');

//* The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //* find all categories
  //* be sure to include its associated Products
  try {
    let categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  //* find one category by its `id` value
  //* be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
  .then((category) => res.json(category))
  .catch((err) => res.status(500).json(err));
});

//* create a new category
router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//* update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  //* delete a category by its `id` value
  Category.destroy(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
