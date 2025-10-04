const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Create a new user (by Admin)
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = async (req, res) => {
  const { name, email, password, role, managerId } = req.body;
  
  // The admin user is available from the 'protect' middleware (req.user)
  const admin = req.user;

  try {
    // Check if user with that email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // If a manager is assigned, ensure they exist and are a manager
    if (managerId) {
        const manager = await User.findById(managerId);
        if (!manager || manager.role !== 'Manager' || manager.company.toString() !== admin.company.toString()) {
            return res.status(400).json({ msg: 'Invalid manager ID' });
        }
    }

    user = new User({
      name,
      email,
      password,
      role, // 'Employee' or 'Manager'
      company: admin.company, // Assign to the admin's company
      manager: managerId || null,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    
    // Don't send the password in the response
    user.password = undefined;

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating user' });
  }
};

// @desc    Get all users in the admin's company
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ company: req.user.company })
      .populate('manager', 'name email') // Populate manager's name and email
      .select('-password'); // Exclude password from the result
      
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching users' });
  }
};

// @desc    Get a single user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('manager', 'name email')
            .select('-password');
        
        if (!user || user.company.toString() !== req.user.company.toString()) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update a user's role or manager
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = async (req, res) => {
  const { role, managerId } = req.body;

  try {
    let user = await User.findById(req.params.id);

    // Check if user exists and belongs to the admin's company
    if (!user || user.company.toString() !== req.user.company.toString()) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // An admin should not be able to accidentally change their own role
    if (user.id === req.user.id && role && role !== 'Admin') {
        return res.status(400).json({ msg: 'Admins cannot change their own role.' });
    }
    
    const updateFields = {};
    if (role) updateFields.role = role;
    if (managerId !== undefined) updateFields.manager = managerId || null; // Allow un-assigning a manager

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true })
      .select('-password')
      .populate('manager', 'name email');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating user' });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Check if user exists and belongs to the admin's company
    if (!user || user.company.toString() !== req.user.company.toString()) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Prevent an admin from deleting themselves
    if (user.id === req.user.id) {
        return res.status(400).json({ msg: 'You cannot delete your own admin account.' });
    }

    await user.remove();

    res.status(200).json({ msg: 'User removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting user' });
  }
};