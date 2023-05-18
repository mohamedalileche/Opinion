// import User from"../Models/user.js";
// import asyncHandler from "express-async-handler";
// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// dotenv.config();

// //  Create a User
// const createUser = asyncHandler(async (req, res) => {
//   const email = req.body.email;
//   const findUser = await User.findOne({ email: email });
//   if (!findUser) {
//     const newUser = await User.create(req.body);
//     res.json({
//       id: newUser._id,
//       accessToken: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET),
//     });
//   } else {
//     throw new Error("User already exists");
//   }
// });

// // Get All users

// const getallUser = asyncHandler(async (req, res) => {
//   try {
//     const getUsers = await User.find();
//     res.json(getUsers);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // Get a single user

// const getaUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   try {
//     const getaUser = await User.findById(id);
//     res.json({
//       getaUser,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // Login a user
// const loginUserCtrl = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   //  check if user exists or not
//   const findUser = await User.findOne({ email });
//   if (findUser && (await findUser.isPasswordMatched(password))) {
//     res.json({
//       _id: findUser?._id,
//       name: findUser?.name,
//       email: findUser?.email,
//       token: jwt.sign({ id: findUser?._id }, process.env.JWT_SECRET),
//     });
//   } else {
//     throw new Error("invalid credentials");
//   }
// });

// // Delete a user

// const deleteaUser = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);

//   try {
//     const deleteaUser = await User.findByIdAndDelete(id);
//     res.json({
//       deleteaUser,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// // Logout functionality

// const logout = asyncHandler(async (req, res) => {
//   const cookie = req.cookies;
//   if (!cookie?.refreshToken) throw new Error("No Refresh token in Cookies");
//   const refreshToken = cookie.refreshToken;
//   const user = await User.findOne({ refreshToken });
//   if (!user) {
//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: true,
//     });
//     return res.sendStatus(204); //forbidden
//   }
//   await User.findOneAndUpdate(refreshToken, {
//     refreshToken: "",
//   });
//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: true,
//   });
//   res.sendStatus(204); //forbidden
// });

// // Update a user

// const updatedUser = asyncHandler(async (req, res) => {
//   console.log();
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       _id,
//       {
//         name: req?.body?.name,
//         email: req?.body?.email,
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// export {
//   createUser,
//   getaUser,
//   getallUser,
//   loginUserCtrl,
//   deleteaUser,
//   logout,
//   updatedUser,
// };




import validator from "validator"
import bcrypt from "bcrypt"
import { createToken } from "../Middlewares/auth.js"
import  User  from "../Models/user.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
}
// pour s'enregistrer

export const register = async (req, res) => {
    const {name, email, password} = req.body
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create({name, email, password: hashedPassword})
        res.status(200).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}
//pour l'authauntification :verification des identifiant et creation du token
export const login = async (req, res) => {
    const {email, password} = req.body
    
    try {    
        if (!email || !password){
        throw Error('tout les champs sont requis !')
    }
    
    if (!validator.isEmail(email)) {
        throw Error('invalid email')
    }
        const user = await User.findOne({email})
        if (!user){
            throw Error('user not found!')
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            throw Error("password invalid")
        }

        const authToken = createToken(user._id)
        res.cookie("authToken", {authToken}, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 1000 * 3})
        res.sendStatus(200)
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken")
    res.status(200).json("logout success")
  } catch (error) {
    res.status(400).json(error)
  }
}