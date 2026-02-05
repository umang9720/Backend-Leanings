const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        role,
    });

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
    );

    res.cookie = req.body.cookie;

    res.status(201).json({
        message: "User Created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        },
    });
}

async function loginUser(req, res) {
    const { username, email, password, role = "user" } = req.body;

    const user = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        return res.status(401).json({
            message: " Invalid Credentials",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: " wrong password",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
    );

    res.cookie = req.body.cookie;

    res.status(201).json({
        message: "Login successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token,
        },
    });
}

async function logout(req,res) {

    res.clearCookie("token")

    res.status(200).json({
        message:"user log out successfully"
    })

    
}
module.exports = { registerUser, loginUser, logout };

// const userModel = require("../models/user.model");
// const bcrypt = require("bcrypt");

// async function registerUser(req, res) {
//   const { username, email, password, role = "user" } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await userModel.create({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     return res.status(201).json({ message: "User registered successfully" });

//   } catch (err) {
//     // Mongo duplicate key error
//     if (err.code === 11000) {
//       const field = Object.keys(err.keyPattern)[0];
//       return res.status(409).json({
//         message: `${field} already exists`,
//       });
//     }

//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }

// module.exports = registerUser;
