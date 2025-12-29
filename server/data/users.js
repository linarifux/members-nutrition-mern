import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'John Doe (Retail)',
    email: 'retail@example.com',
    password: 'password123',
    role: 'retail',
  },
  {
    name: 'Jane Smith (Wholesale)',
    email: 'wholesale@example.com',
    password: 'password123',
    role: 'wholesale',
    wholesaleProfile: {
      companyName: 'Healthy Life Inc.',
      taxId: 'TX-998877',
      status: 'approved', // They can see wholesale prices immediately
    },
  },
];

export default users;