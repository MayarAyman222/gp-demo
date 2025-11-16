
import express from "express";
import { getAllIcons, getIconById, createIcon } from "../controllers/iconController.js";

const router = express.Router();

router.get("/", getAllIcons);
router.get("/:id", getIconById);
router.post("/", createIcon);

export default router;
