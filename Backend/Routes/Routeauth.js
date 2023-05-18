// import  express  from "express";

// import {
//   createUser,
//   getallUser,
//   getaUser,
//   loginUserCtrl,
//   logout,
//   deleteaUser,
//   updatedUser,
// } from "../Controllers/UserControllers.js";
// import { isAdmin, authMiddleware } from"../Middlewares/auth.js";

// const router = express.Router();

// router.post("/register", createUser);
// router.get("/all-users", getallUser);
// router.get("/:id", authMiddleware, isAdmin, getaUser);
// router.post("/login", loginUserCtrl);
// router.get("/logout", logout);
// router.delete("/:id", deleteaUser);
// router.put("/edit-user", authMiddleware, updatedUser);



import express from 'express';

import * as userController from '../Controllers/UserControllers.js';
import { userAuthValidation } from '../Middlewares/auth.js';
import { createPost, deletePost, getPosts, updatePost } from '../Controllers/PostControllers.js';





const router = express.Router();


// Routes pour les users
router.get("/users", userController.getUsers)
router.post("/users/register", userController.register)
router.post("/users/login", userController.login)
router.get("/users/logout", userController.logout)


// Routes pour les posts

router.post('/posts/create', createPost);
router.get('/posts', getPosts);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id',deletePost);   


export default router