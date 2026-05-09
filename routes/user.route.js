import express from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import Listing from '../models/listing.model.js';

const router = express.Router();

// 1. UPDATE USER
router.post('/update/:id', async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. DELETE USER
router.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. SIGN OUT
router.get('/signout', (req, res) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. SHOW LISTINGS
router.get('/listings/:id', async (req, res) => {
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. GET USER (THE MISSING PIECE)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found!' });
    
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;