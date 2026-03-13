const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    uploadAvatar,
    addAddress,
    updateAddress,
    deleteAddress,
    getAllUsers
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/profile/avatar', protect, upload.single('avatar'), uploadAvatar);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:addressId', protect, updateAddress);
router.delete('/addresses/:addressId', protect, deleteAddress);
router.get('/', protect, admin, getAllUsers);

module.exports = router;
