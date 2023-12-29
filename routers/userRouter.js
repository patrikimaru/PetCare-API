const express = require('express');
const authenticateToken = require('../middlewares/AuthenticateToken');

const {
  getAllUsers,
  getUserById,
  updateUserById,
  registerUser,
  registerAdmin,
  loginUser,
  deleteAllUsers,
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/admin/register', registerAdmin);
router.post('/login', loginUser);

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, updateUserById);
router.delete('/', authenticateToken, deleteAllUsers);


module.exports = router;
