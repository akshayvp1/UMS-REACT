import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateTokens from '../utils/generateToken.js'; 
import jwt from 'jsonwebtoken'

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    
  
    try {
      const user = await User.findOne({ email });
        console.log("user",user);
        
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      if (!user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      
      const { accessToken, refreshToken } = generateTokens(user.id, user.email);
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
  
      
      res.status(200).json({
        success:true,
        user,
        accessToken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Fetch all users with their name, email, and image
export const getAllUsers = async (req, res) => {
    
    try {
      const users = await User.find({}, 'name email image'); 
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  // Update user profile name
  export const updateUserProfileName = async (req, res) => {
    const { userId } = req.params;
    const { name } = req.body; 
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name }, 
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User name updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  // Update user profile picture (Image URL only)
  export const updateUserProfilePicture = async (req, res) => {
    const { userId } = req.params;
    const { imageUrl } = req.body; 
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { image: imageUrl }, 
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User profile picture updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  // Delete user
  export const deleteUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  export const addUser = async (req, res) => {
    const { name, email, password, image } = req.body;
      console.log(req.body);
      
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
  
      const newUser = new User({
        name,
        email,
        password,
        image, 
      });
  
      
      await newUser.save();
      res.status(201).json({success: true, message: "User added successfully", user: newUser });
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Server error, could not add user" });
    }
  };

  export const getUsers = async (req, res) => {
    const { search } = req.query; 
    const query = {};
  
    if (search) {
      
      const regex = new RegExp(search, 'i'); 
      query.$or = [
        { name: { $regex: regex } },
        { email: { $regex: regex } }
      ];
    }
  
    try {
      const users = await User.find(query);
      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  export const adminLogout = async (req, res) => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  
    res.status(200).json({
      message: 'Logged out successfully',
      success: true,
    });
  };
  