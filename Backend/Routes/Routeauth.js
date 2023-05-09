import  express  from "express";

import {
  createUser,
  getallUser,
  getaUser,
  loginUserCtrl,
  logout,
  deleteaUser,
  updatedUser,
} from "../Controllers/UserControllers.js";
import { isAdmin, authMiddleware } from"../Middlewares/auth.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/all-users", getallUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.post("/login", loginUserCtrl);
router.get("/logout", logout);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);

export default router;