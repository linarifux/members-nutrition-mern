import mongoose from 'mongoose';

// Schema for individual variants (e.g., Small Red Shirt)
const variantSchema = new mongoose.Schema({
  sku: { type: String, required: true }, // Stock Keeping Unit
  
  // The combination attributes, e.g., { "Size": "Small", "Color": "Red" }
  attributes: { 
    type: Map, 
    of: String 
  }, 
  
  priceRetail: { type: Number, required: true },
  priceWholesale: { type: Number, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  image: { type: String } // Variant specific image (optional)
});

const productSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL friendly name
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true }, // e.g., "Vitamins"
  subCategory: { type: String },              // e.g., "Men's Health"
  
  // Images (Main product gallery)
  images: [{ type: String }],

  // Base Pricing (Fallback if no variant is selected)
  basePriceRetail: { type: Number, required: true },
  basePriceWholesale: { type: Number, required: true },

  // Options Definition (What shows on the UI buttons)
  // Example: [{ name: "Size", values: ["S", "M", "L"] }, { name: "Flavor", values: ["Choco", "Vanilla"] }]
  options: [{
    name: { type: String, required: true },
    values: [{ type: String, required: true }]
  }],

  // The actual inventory items based on the options above
  variants: [variantSchema],

  // Meta
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false } // Soft delete
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;