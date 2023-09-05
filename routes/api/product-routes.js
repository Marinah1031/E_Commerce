const express = require('express');
const router = express.Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const products = await Product.findAll({
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
  // be sure to include its associated Category and Tag data

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        Category,
        {
          model: Tag,
          through: ProductTag,
        },
      ],
    });
    
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
  // be sure to include its associated Category and Tag data


// create new product
router.post('/', async (req, res) => {
  try {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    const product = await Product.create(req.body);

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));

      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
  // update product data
  const [updatedRows] = await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  if (updatedRows === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (req.body.tagIds && req.body.tagIds.length) {
    const existingProductTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });

    const existingTagIds = existingProductTags.map(({ tag_id }) => tag_id);
    const newTagIds = req.body.tagIds.filter((tag_id) => !existingTagIds.includes(tag_id));

    const newProductTags = newTagIds.map((tag_id) => ({
      product_id: req.params.id,
      tag_id,
    }));

            // figure out which ones to remove
            await Promise.all([
              ProductTag.destroy({
                where: { product_id: req.params.id, id: { [Op.notIn]: existingProductTags.map(({ id }) => id) } },
              }),
              ProductTag.bulkCreate(newProductTags),
            ]);
          }
                  // run both actions
                  return res.status(200).json({ message: 'Product updated successfully' });
                } catch (err) {
                  console.error(err);
                  return res.status(500).json(err);
                }
              });

    router.delete('/:id', async (req, res) => {
  try {
    const deletedRows = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
