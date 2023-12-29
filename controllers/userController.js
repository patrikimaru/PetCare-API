const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userController = {
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },

  getUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  },

  updateUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  },

  registerUser: async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, phoneNumber, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully.', user: newUser });
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_LOGIN_KEY, { expiresIn: '7d' });
    res.json({ message: 'Login successful.', token });
  },

  deleteAllUsers: async (req, res) => {
    try {
      await User.deleteMany({});
      res.status(204).end();
    } catch (error) {
      console.error('Error in deleteAllUsers:', error);
      res.status(500).json({ error: error });
    }
  },
};

module.exports = userController;
