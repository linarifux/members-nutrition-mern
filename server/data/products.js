const products = [
  // 1. Organic Whey Protein
  {
    name: 'Youthful Cleanse',
    slug: 'youthful-cleanse-complete-body-detox',
    image: 'https://membersnutrition.com/cdn/shop/products/15-DAY-CLEANSE-30S-7519-ANGLE-1_e9e0b309-8b95-4805-9ab3-84b25d550f08.jpg?v=1716531599&width=1400', 
    description: "Give a body a healthy boost with Daily Defense Youthful Cleanse. This gentle product is effective and will greatly assist you in removing stored fats and toxins and restoring your system to health and balance. We use a blend of senna leaf, cascara sagrada bark and gentle aloe vera to create motility in your intestine and bring you regularity. Licorice root assists your liver to cleanse and pull accumulated toxins for safe excretion. As your system cleanses, your gastrointestinal tract will be restored to balance and health. The process enhances your immune system and gives you a solid foundation to build health and helps you to maintain a healthy youthful glow! Youthful Cleanse Colon Detox and Cleanse Supplement is your ultimate solution for promoting digestive wellness, bloated stomach weight loss, and overall well-being. Specially formulated with a gentle and effective blend of natural ingredients, this body detox cleanse supplement is designed to detoxify and cleanse your colon, restoring its optimal function.",
    brand: 'Daily Defense',
    category: 'Protein',
    basePriceRetail: 59.99,
    basePriceWholesale: 35.00,
    countInStock: 100,
    rating: 4.8,
    numReviews: 45,
    options: [
      { name: 'Flavor', values: ['Chocolate', 'Vanilla'] },
      { name: 'Size', values: ['2lbs', '5lbs'] }
    ],
    variants: [
      {
        sku: 'WHEY-CHOCO-2LB',
        attributes: { Flavor: 'Chocolate', Size: '2lbs' },
        priceRetail: 59.99,
        priceWholesale: 35.00,
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
      },
      {
        sku: 'WHEY-VAN-5LB',
        attributes: { Flavor: 'Vanilla', Size: '5lbs' },
        priceRetail: 99.99,
        priceWholesale: 65.00,
        countInStock: 15
      }
    ]
  },
  // 2. Daily Multivitamin
  {
    name: 'Daily Multivitamin',
    slug: 'daily-multivitamin',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop',
    description: 'Complete nutrient spectrum essential for daily health and immune support.',
    brand: 'Members Nutrition',
    category: 'Vitamins',
    basePriceRetail: 25.00,
    basePriceWholesale: 12.50,
    countInStock: 200,
    rating: 4.9,
    numReviews: 120,
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
  // 3. Creatine Monohydrate
  {
    name: 'Pure Creatine Monohydrate',
    slug: 'pure-creatine-monohydrate',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=1000&auto=format&fit=crop',
    description: 'Micronized creatine monohydrate for improved strength, power, and muscle endurance.',
    brand: 'Members Nutrition',
    category: 'Performance',
    basePriceRetail: 34.99,
    basePriceWholesale: 18.00,
    countInStock: 150,
    rating: 5.0,
    numReviews: 85,
    options: [
      { name: 'Size', values: ['500g', '1kg'] }
    ],
    variants: [
      {
        sku: 'CREATINE-500G',
        attributes: { Size: '500g' },
        priceRetail: 34.99,
        priceWholesale: 18.00,
        countInStock: 100
      },
      {
        sku: 'CREATINE-1KG',
        attributes: { Size: '1kg' },
        priceRetail: 59.99,
        priceWholesale: 32.00,
        countInStock: 50
      }
    ]
  },
  // 4. Pre-Workout Ignite
  {
    name: 'Ignite Pre-Workout',
    slug: 'ignite-pre-workout',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000&auto=format&fit=crop',
    description: 'Explosive energy and focus matrix. Contains Caffeine, Beta-Alanine, and Citrulline.',
    brand: 'Members Nutrition',
    category: 'Performance',
    basePriceRetail: 44.99,
    basePriceWholesale: 22.50,
    countInStock: 80,
    rating: 4.6,
    numReviews: 60,
    options: [
      { name: 'Flavor', values: ['Fruit Punch', 'Blue Raspberry'] }
    ],
    variants: [
      {
        sku: 'PRE-FRUIT',
        attributes: { Flavor: 'Fruit Punch' },
        priceRetail: 44.99,
        priceWholesale: 22.50,
        countInStock: 40
      },
      {
        sku: 'PRE-BLUE',
        attributes: { Flavor: 'Blue Raspberry' },
        priceRetail: 44.99,
        priceWholesale: 22.50,
        countInStock: 40
      }
    ]
  },
  // 5. Omega-3 Fish Oil
  {
    name: 'Triple Strength Omega-3',
    slug: 'triple-strength-omega-3',
    image: 'https://images.unsplash.com/photo-1616671238914-9e63df858482?q=80&w=1000&auto=format&fit=crop',
    description: 'High potency EPA & DHA fish oil for heart, brain, and joint health.',
    brand: 'Members Nutrition',
    category: 'Wellness',
    basePriceRetail: 29.99,
    basePriceWholesale: 14.00,
    countInStock: 200,
    rating: 4.8,
    numReviews: 200,
    options: [
      { name: 'Count', values: ['90 Softgels', '180 Softgels'] }
    ],
    variants: [
      {
        sku: 'OMEGA-90',
        attributes: { Count: '90 Softgels' },
        priceRetail: 29.99,
        priceWholesale: 14.00,
        countInStock: 120
      },
      {
        sku: 'OMEGA-180',
        attributes: { Count: '180 Softgels' },
        priceRetail: 49.99,
        priceWholesale: 24.00,
        countInStock: 80
      }
    ]
  },
  // 6. Magnesium Glycinate
  {
    name: 'Magnesium Glycinate',
    slug: 'magnesium-glycinate',
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=1000&auto=format&fit=crop',
    description: 'Highly absorbable magnesium for sleep support, muscle relaxation, and stress relief.',
    brand: 'Members Nutrition',
    category: 'Minerals',
    basePriceRetail: 21.99,
    basePriceWholesale: 10.50,
    countInStock: 120,
    rating: 4.9,
    numReviews: 95,
    options: [], // Single variant product
    variants: [
      {
        sku: 'MAG-GLY-120',
        attributes: {},
        priceRetail: 21.99,
        priceWholesale: 10.50,
        countInStock: 120
      }
    ]
  },
  // 7. BCAA Recovery
  {
    name: 'BCAA Recovery Formula',
    slug: 'bcaa-recovery-formula',
    image: 'https://images.unsplash.com/photo-1594498653385-d51756955022?q=80&w=1000&auto=format&fit=crop',
    description: 'Branched-Chain Amino Acids (2:1:1) to support muscle recovery and reduce soreness.',
    brand: 'Members Nutrition',
    category: 'Performance',
    basePriceRetail: 28.00,
    basePriceWholesale: 15.00,
    countInStock: 90,
    rating: 4.5,
    numReviews: 30,
    options: [
      { name: 'Flavor', values: ['Watermelon', 'Lemon Lime'] }
    ],
    variants: [
      {
        sku: 'BCAA-WATER',
        attributes: { Flavor: 'Watermelon' },
        priceRetail: 28.00,
        priceWholesale: 15.00,
        countInStock: 45
      },
      {
        sku: 'BCAA-LEMON',
        attributes: { Flavor: 'Lemon Lime' },
        priceRetail: 28.00,
        priceWholesale: 15.00,
        countInStock: 45
      }
    ]
  },
  // 8. Vitamin D3 + K2
  {
    name: 'Vitamin D3 + K2',
    slug: 'vitamin-d3-k2',
    image: 'https://images.unsplash.com/photo-1611073898687-0b191599557b?q=80&w=1000&auto=format&fit=crop',
    description: 'Essential duo for bone health, immune function, and calcium absorption.',
    brand: 'Members Nutrition',
    category: 'Vitamins',
    basePriceRetail: 19.99,
    basePriceWholesale: 9.00,
    countInStock: 300,
    rating: 5.0,
    numReviews: 150,
    options: [],
    variants: [
      {
        sku: 'D3K2-60',
        attributes: {},
        priceRetail: 19.99,
        priceWholesale: 9.00,
        countInStock: 300
      }
    ]
  },
  // 9. Collagen Peptides
  {
    name: 'Hydrolyzed Collagen Peptides',
    slug: 'collagen-peptides',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop',
    description: 'Supports healthy hair, skin, nails, and joints. Unflavored and easy to mix.',
    brand: 'Members Nutrition',
    category: 'Beauty & Wellness',
    basePriceRetail: 39.99,
    basePriceWholesale: 21.00,
    countInStock: 85,
    rating: 4.7,
    numReviews: 65,
    options: [
      { name: 'Size', values: ['1lb', '2lb'] }
    ],
    variants: [
      {
        sku: 'COLLAGEN-1LB',
        attributes: { Size: '1lb' },
        priceRetail: 39.99,
        priceWholesale: 21.00,
        countInStock: 50
      },
      {
        sku: 'COLLAGEN-2LB',
        attributes: { Size: '2lb' },
        priceRetail: 69.99,
        priceWholesale: 38.00,
        countInStock: 35
      }
    ]
  },
  // 10. Zinc Picolinate
  {
    name: 'Zinc Picolinate 50mg',
    slug: 'zinc-picolinate',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000&auto=format&fit=crop',
    description: 'High absorption zinc for immune system support and skin health.',
    brand: 'Members Nutrition',
    category: 'Minerals',
    basePriceRetail: 14.99,
    basePriceWholesale: 6.50,
    countInStock: 250,
    rating: 4.8,
    numReviews: 40,
    options: [],
    variants: [
      {
        sku: 'ZINC-50MG',
        attributes: {},
        priceRetail: 14.99,
        priceWholesale: 6.50,
        countInStock: 250
      }
    ]
  },
  // 11. Sleep Aid Melatonin
  {
    name: 'Deep Sleep Melatonin',
    slug: 'deep-sleep-melatonin',
    image: 'https://images.unsplash.com/photo-1541781777621-39142f6d2086?q=80&w=1000&auto=format&fit=crop',
    description: 'Natural sleep aid with 5mg Melatonin, Chamomile, and Valerian Root.',
    brand: 'Members Nutrition',
    category: 'Wellness',
    basePriceRetail: 18.99,
    basePriceWholesale: 8.50,
    countInStock: 110,
    rating: 4.4,
    numReviews: 55,
    options: [],
    variants: [
      {
        sku: 'SLEEP-60',
        attributes: {},
        priceRetail: 18.99,
        priceWholesale: 8.50,
        countInStock: 110
      }
    ]
  },
  // 12. Vegan Protein
  {
    name: 'Plant-Based Vegan Protein',
    slug: 'vegan-protein',
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=1000&auto=format&fit=crop',
    description: 'Pea and Rice protein blend. Dairy-free, soy-free, and delicious.',
    brand: 'Members Nutrition',
    category: 'Protein',
    basePriceRetail: 54.99,
    basePriceWholesale: 30.00,
    countInStock: 60,
    rating: 4.6,
    numReviews: 35,
    options: [
      { name: 'Flavor', values: ['Chocolate Fudge', 'Vanilla Bean'] }
    ],
    variants: [
      {
        sku: 'VEGAN-CHOCO',
        attributes: { Flavor: 'Chocolate Fudge' },
        priceRetail: 54.99,
        priceWholesale: 30.00,
        countInStock: 30
      },
      {
        sku: 'VEGAN-VAN',
        attributes: { Flavor: 'Vanilla Bean' },
        priceRetail: 54.99,
        priceWholesale: 30.00,
        countInStock: 30
      }
    ]
  },
  // 13. Electrolyte Hydration
  {
    name: 'Hydra-Charge Electrolytes',
    slug: 'hydration-electrolytes',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop',
    description: 'Rapid hydration powder with Sodium, Potassium, and Magnesium. Zero sugar.',
    brand: 'Members Nutrition',
    category: 'Performance',
    basePriceRetail: 32.99,
    basePriceWholesale: 16.00,
    countInStock: 140,
    rating: 4.9,
    numReviews: 88,
    options: [
      { name: 'Flavor', values: ['Orange', 'Berry'] }
    ],
    variants: [
      {
        sku: 'HYDRA-ORG',
        attributes: { Flavor: 'Orange' },
        priceRetail: 32.99,
        priceWholesale: 16.00,
        countInStock: 70
      },
      {
        sku: 'HYDRA-BER',
        attributes: { Flavor: 'Berry' },
        priceRetail: 32.99,
        priceWholesale: 16.00,
        countInStock: 70
      }
    ]
  },
  // 14. Green Superfood
  {
    name: 'Organic Green Superfood',
    slug: 'organic-green-superfood',
    image: 'https://images.unsplash.com/photo-1610725663728-667362725920?q=80&w=1000&auto=format&fit=crop',
    description: 'Daily greens blend with Wheatgrass, Spirulina, and Chlorella for detox and energy.',
    brand: 'Members Nutrition',
    category: 'Wellness',
    basePriceRetail: 42.00,
    basePriceWholesale: 21.00,
    countInStock: 95,
    rating: 4.7,
    numReviews: 42,
    options: [
      { name: 'Size', values: ['30 Servings', '60 Servings'] }
    ],
    variants: [
      {
        sku: 'GREENS-30',
        attributes: { Size: '30 Servings' },
        priceRetail: 42.00,
        priceWholesale: 21.00,
        countInStock: 50
      },
      {
        sku: 'GREENS-60',
        attributes: { Size: '60 Servings' },
        priceRetail: 75.00,
        priceWholesale: 40.00,
        countInStock: 45
      }
    ]
  },
  // 15. Probiotic Defense
  {
    name: 'Probiotic Defense 50B',
    slug: 'probiotic-defense',
    image: 'https://images.unsplash.com/photo-1594052327771-4ee7d903023e?q=80&w=1000&auto=format&fit=crop',
    description: '50 Billion CFU probiotic for digestive health and gut balance.',
    brand: 'Members Nutrition',
    category: 'Wellness',
    basePriceRetail: 35.99,
    basePriceWholesale: 17.50,
    countInStock: 180,
    rating: 4.8,
    numReviews: 105,
    options: [],
    variants: [
      {
        sku: 'PROBIO-30',
        attributes: {},
        priceRetail: 35.99,
        priceWholesale: 17.50,
        countInStock: 180
      }
    ]
  }
];

export default products;