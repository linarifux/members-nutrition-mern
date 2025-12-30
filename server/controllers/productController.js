import asyncHandler from '../utils/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // Support for "Featured" filter if needed
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword, isArchived: false }); // Hide archived by default
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    basePriceRetail,
    basePriceWholesale,
    description,
    images,       // <--- Now expecting an Array
    brand,
    category,
    subCategory,  // <--- New Field
    countInStock,
    options,
    variants,
    isFeatured,   // <--- New Field
    isArchived,   // <--- New Field
    slug
  } = req.body;

  const product = new Product({
    name,
    slug: slug || name.toLowerCase().split(' ').join('-') + '-' + Date.now(), // Ensure uniqueness
    basePriceRetail,
    basePriceWholesale,
    user: req.user._id,
    images: images || [],
    brand,
    category,
    subCategory,
    countInStock,
    numReviews: 0,
    description,
    options,
    variants,
    isFeatured: isFeatured || false,
    isArchived: isArchived || false,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    basePriceRetail,
    basePriceWholesale,
    description,
    images,
    brand,
    category,
    subCategory,
    countInStock,
    options,
    variants,
    isFeatured,
    isArchived,
    slug
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.slug = slug || product.slug;
    product.basePriceRetail = basePriceRetail;
    product.basePriceWholesale = basePriceWholesale;
    product.description = description;
    product.images = images; // Update Array
    product.brand = brand;
    product.category = category;
    product.subCategory = subCategory;
    product.countInStock = countInStock;
    product.options = options;
    product.variants = variants;
    product.isFeatured = isFeatured;
    product.isArchived = isArchived;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};