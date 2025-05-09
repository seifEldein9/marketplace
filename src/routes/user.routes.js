import express from "express";
import { getAllUsers, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/users", createUser);

export default router;
