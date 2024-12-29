import express from 'express';
import {User} from '../models/userModel.js';

const router = express.Router();

router.post('/login', async(req, res)=>{
    const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).send({ message: 'All fields are required' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    req.session.role = user.role;
    return res.status(200).send({
      message: 'Login successful',
      user: { email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.post('/logout', async(req, res)=>{
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: 'Logout failed' });
      }
  
      res.clearCookie('connect.sid'); 
      res.status(200).send({ message: 'Logged out successfully' });
    });
})
export default router;