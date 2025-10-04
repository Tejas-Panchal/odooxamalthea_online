const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user and company (ONLY for the first user)
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const { name, email, password, companyName, currency } = req.body;

  try {
    // This logic ensures that the public signup route is only available
    // when there are absolutely no users in the database.
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res.status(403).json({ msg: 'Public signup is disabled. An admin must create new accounts.' });
    }
    console.log("step 1")
    // 1. Create the company
    const newCompany = await Company.create({
      name: companyName,
      defaultCurrency: currency,
    });
    console.log("step 2")
    // 2. Create the Admin user
    const user = new User({
      name,
      email,
      password,
      role: 'Admin',
      company: newCompany._id,
    });
    console.log("step 3")
    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    console.log("step 4")
    // 3. Generate token and send response
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during signup' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    console.log('step 1');

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    console.log('step 2');

    // Generate token and send response
    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

// @desc    Get logged-in user's data
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    // The user's ID is attached to req.user by the 'protect' middleware (Step 5)
    // We fetch the user data but exclude the password for security.
    const user = await User.findById(req.user.id).select('-password').populate('company', 'name defaultCurrency');
    
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};