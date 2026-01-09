import express from "express";
import {
  getAllIcons,
  getIconById,
  createIcon,
  updateIcon,
  deleteIcon,
  getSubIconById,
  createSubIcon,
  updateSubIcon,
  deleteSubIcon
} from "../controllers/iconController.js";

const router = express.Router();

// ===== ICON ROUTES =====
// GET /icons?category=Real%20Life
router.get("/", getAllIcons);

// GET /icons/:id
router.get("/:id", getIconById);

// POST /icons
router.post("/", createIcon);

// PUT /icons/:id
router.put("/:id", updateIcon);

// DELETE /icons/:id
router.delete("/:id", deleteIcon);

// ===== SUBICON ROUTES =====
// GET single subIcon
router.get("/:iconId/subicons/:subIconId", getSubIconById);

// POST new subIcon under an icon
router.post("/:iconId/subicons", createSubIcon);

// PUT update subIcon
router.put("/subicons/:id", updateSubIcon);

// DELETE subIcon
router.delete("/subicons/:id", deleteSubIcon);

export default router;