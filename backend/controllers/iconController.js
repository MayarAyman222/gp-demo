

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllIcons = async (req, res) => {
  try {
    const icons = await prisma.icon.findMany();
    res.json(icons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icons", error: err.message });
  }
};

export const getIconById = async (req, res) => {
  try {
    const { id } = req.params;
    const icon = await prisma.icon.findUnique({ where: { id: parseInt(id) } });
    if (!icon) return res.status(404).json({ message: "Icon not found" });
    res.json(icon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icon", error: err.message });
  }
};

export const createIcon = async (req, res) => {
  try {
    const { title, expression, iconName } = req.body;

    if (!title || !expression || !iconName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIcon = await prisma.icon.create({
      data: { title, expression, iconName },
    });

    res.status(201).json(newIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating icon", error: error.message });
  }
};
