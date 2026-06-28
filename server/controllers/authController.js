import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//POST /api/auth/register
export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}
		
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: "Email already in use" });
		}

		const user = await User.create({ name, email, password });
		const token = generateToken(user._id);

		return res.status(201).json({
			token, 
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (err) {
		return res.status(500).json({ message: "Server error", error: err.message });
	}
};

//POST /api/auth/login
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		
		const user = await User.findOne({ email });
		if (!user || !(await user.comparePassword(password))) {
			return res.status(401).json({ message: "Invalid email or password" });
		}
		
		const token = generateToken(user._id);

		return res.json({
			token, 
			user: { id: user._id, name: user.name, email: user.email },
		});
	} catch (err) {
		return res.status(500).json({ message: "Server error", error: err.message });
	}
};
