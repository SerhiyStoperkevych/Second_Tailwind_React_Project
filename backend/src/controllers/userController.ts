import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel';

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error during sign-in:', error.message);
      res.status(500).json({ error: 'Failed to sign in', details: error.message });
    } else {
      console.error('Unknown error during sign-in:', error);
      res.status(500).json({ error: 'Failed to sign in', details: 'An unknown error occurred' });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find({});
        res.status(200).json(users); // Changed to 200 OK for successful fetch
    } catch (error) {
        console.log("Error in fetching:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const postUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error("Error during user creation:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
};