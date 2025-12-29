import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'; // Optional: makes console logs pretty (npm i colors)
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // 2. Insert Users ONE BY ONE (To trigger encryption middleware)
    // We cannot use insertMany here because it bypasses the password hashing
    const createdUsers = [];
    for (const user of users) {
      const newUser = await User.create(user);
      createdUsers.push(newUser);
    }

    const adminUser = createdUsers[0]._id; // Grab the admin's ID

    // 3. Add Admin User ID to products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // 4. Insert Products (insertMany is fine here, no encryption needed)
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};


const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

// Check command line argument to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}