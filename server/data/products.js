const products = [
  {
    name: 'Organic Whey Protein',
    slug: 'organic-whey-protein',
    image: '/images/whey.jpg', // Placeholder
    description: 'Premium grass-fed whey protein for muscle recovery.',
    brand: 'Members Nutrition',
    category: 'Supplements',
    basePriceRetail: 59.99,
    basePriceWholesale: 35.00,
    countInStock: 100,
    rating: 4.5,
    numReviews: 12,
    
    // 1. Define the Options available
    options: [
      { name: 'Flavor', values: ['Chocolate', 'Vanilla'] },
      { name: 'Size', values: ['2lbs', '5lbs'] }
    ],

    // 2. Define the Variants (Combinations with Dual Pricing)
    variants: [
      {
        sku: 'WHEY-CHOCO-2LB',
        attributes: { Flavor: 'Chocolate', Size: '2lbs' },
        priceRetail: 59.99,
        priceWholesale: 35.00, // Significant discount
        countInStock: 50
      },
      {
        sku: 'WHEY-CHOCO-5LB',
        attributes: { Flavor: 'Chocolate', Size: '5lbs' },
        priceRetail: 99.99,
        priceWholesale: 65.00,
        countInStock: 30
      },
      {
        sku: 'WHEY-VAN-2LB',
        attributes: { Flavor: 'Vanilla', Size: '2lbs' },
        priceRetail: 59.99,
        priceWholesale: 35.00,
        countInStock: 20
      }
    ]
  },
  {
    name: 'Daily Multivitamin',
    slug: 'daily-multivitamin',
    image: '/images/multi.jpg',
    description: 'Essential vitamins for daily health.',
    brand: 'Members Nutrition',
    category: 'Vitamins',
    basePriceRetail: 25.00,
    basePriceWholesale: 12.50,
    countInStock: 200,
    rating: 5.0,
    numReviews: 8,
    
    options: [
        { name: 'Type', values: ['Men', 'Women'] }
    ],

    variants: [
        {
            sku: 'MULTI-MEN',
            attributes: { Type: 'Men' },
            priceRetail: 25.00,
            priceWholesale: 12.50,
            countInStock: 100
        },
        {
            sku: 'MULTI-WOMEN',
            attributes: { Type: 'Women' },
            priceRetail: 25.00,
            priceWholesale: 12.50,
            countInStock: 100
        }
    ]
  },
];

export default products;