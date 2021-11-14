const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//* The `/api/tags` endpoint
  //* find all tags

router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [
        { 
          model: Product, 
          through: ProductTag 
        }
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//* find a single tag by its `id`

router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [
        { 
          model: Product, 
          through: ProductTag 
        }
      ],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//* create a new tag
router.post('/', (req, res) => {
  try {
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

//* update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
  const tags = Tag.update(req.body, {
    where: {
      id: req.params.id
    },
  });
  if (!tags) {
    res. status(404).json(
      { 
        message: 'Tag to update NOT found.'
      });
    }
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);

    }
  });
//* delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
   try {
     const tags = await Tag.destroy({
       where: {
         id: req.params.id,
       },
     });
     if (!tags) {
       res.status(404).json({
         message: 'Tag to delete NOT found'
       });
     }
     res.status(200).json({
       message: 'Deleted Tag!'
     });
   } catch (err) {
     res.status(500).json(err);
   } 

});

//* Export
module.exports = router;
