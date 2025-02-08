import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateTokens from '../utils/generateToken.js'; 
import jwt from 'jsonwebtoken'
import { ExplainVerbosity } from 'mongodb';

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

  
    const { accessToken, refreshToken } = generateTokens(user.id, user.email);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({
      user,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Register User (Signup)
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate both Access and Refresh Tokens
    const { accessToken, refreshToken } = generateTokens(user.id, user.email);

    // Set Refresh Token as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,  
    });

    // Send Access Token in response
    res.status(200).json({
      user,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const checkAuth = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log('Token received:', token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    console.log('Verifying token...');
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decoded.id;

    // Find the user by the decoded user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Error in token verification:', error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, image } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

 
    user.name = name || user.name;
    user.image = image || user.image;

    await user.save();

    
    res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        image: user.image, 
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "An error occurred while updating the profile" });
  }
};

export const logOut = (req, res) => {
  
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
