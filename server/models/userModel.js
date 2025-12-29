import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Role Management
  role: { 
    type: String, 
    enum: ['retail', 'wholesale', 'admin'], 
    default: 'retail' 
  },

  // Wholesale Specific Data (Only used if role is wholesale)
  wholesaleProfile: {
    companyName: { type: String },
    taxId: { type: String },
    status: { 
      type: String, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' 
    }
  },

  // Address for shipping logic later
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }
}, {
  timestamps: true
});

// Method: Match user entered password to hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hook: Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;