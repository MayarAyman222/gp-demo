
/*import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all icons or filter by category
export const getAllIcons = async (req, res) => {
  try {
    const { category } = req.query;

    let icons;
    if (category) {
      icons = await prisma.icon.findMany({   distinct: ["title", "category"] ,where: { category } });
    } else {
      icons = await prisma.icon.findMany();
    }

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
    const { title, expression, iconName, category } = req.body;

    if (!title || !expression || !iconName || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIcon = await prisma.icon.create({
      data: { title, expression, iconName, category },
    });

    res.status(201).json(newIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating icon", error: error.message });
  }
};*/

/*import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all icons or filter by category
export const getAllIcons = async (req, res) => {
  try {
    const { category } = req.query;

    let icons;
    if (category) {
      icons = await prisma.icon.findMany({
         where: { category },
        include: { subIcons: true },
      });
    } else {
      icons = await prisma.icon.findMany({
        include: { subIcons: true },
      });
    }

    res.json(icons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icons", error: err.message });
  }
};

// Get single icon by ID
export const getIconById = async (req, res) => {
  try {
    const { id } = req.params;
    const icon = await prisma.icon.findUnique({
      where: { id: parseInt(id) },
      include: { subIcons: true },
    });

    if (!icon) return res.status(404).json({ message: "Icon not found" });

    if (icon.subIcons && icon.subIcons.length > 0) {
      return res.json({ type: "dashboard", icon, subIcons: icon.subIcons });
    } else {
      return res.json({ type: "details", icon });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icon", error: err.message });
  }
};




// Create new icon
export const createIcon = async (req, res) => {
  try {
    const { title, expression, iconName, category } = req.body;

    if (!title || !expression || !iconName || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIcon = await prisma.icon.create({
      data: { title, expression, iconName, category },
    });

    res.status(201).json(newIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating icon", error: error.message });
  }
};

// Update icon
export const updateIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, expression, iconName, category } = req.body;

    const updatedIcon = await prisma.icon.update({
      where: { id: parseInt(id) },
      data: { title, expression, iconName, category },
    });

    res.json(updatedIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating icon", error: error.message });
  }
};

// Delete icon
export const deleteIcon = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.icon.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Icon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting icon", error: error.message });
  }
};*/
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ====== ICON APIs ======

// Get all icons or filter by category
export const getAllIcons = async (req, res) => {
  try {
    const { category } = req.query;

    let icons;
    if (category) {
      icons = await prisma.icon.findMany({
        where: { category },
        include: { subIcons: true },
      });
    } else {
      icons = await prisma.icon.findMany({
        include: { subIcons: true },
      });
    }

    res.json(icons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icons", error: err.message });
  }
};

// Get single icon by ID
export const getIconById = async (req, res) => {
  try {
    const { id } = req.params;
    const icon = await prisma.icon.findUnique({
      where: { id: parseInt(id) },
      include: { subIcons: true },
    });

    if (!icon) return res.status(404).json({ message: "Icon not found" });

    if (icon.subIcons && icon.subIcons.length > 0) {
      return res.json({ type: "dashboard", icon, subIcons: icon.subIcons });
    } else {
      return res.json({ type: "details", icon });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching icon", error: err.message });
  }
};

// Create new icon
export const createIcon = async (req, res) => {
  try {
    const { title, expression, iconName, category } = req.body;

    if (!title || !expression || !iconName || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIcon = await prisma.icon.create({
      data: { title, expression, iconName, category },
    });

    res.status(201).json(newIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating icon", error: error.message });
  }
};

// Update icon
export const updateIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, expression, iconName, category } = req.body;

    const updatedIcon = await prisma.icon.update({
      where: { id: parseInt(id) },
      data: { title, expression, iconName, category },
    });

    res.json(updatedIcon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating icon", error: error.message });
  }
};

// Delete icon
export const deleteIcon = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.icon.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Icon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting icon", error: error.message });
  }
};

// ====== SUBICON APIs ======

// Get single SubIcon by ID
export const getSubIconById = async (req, res) => {
  try {
    const { subIconId } = req.params;
    const subIcon = await prisma.subIcon.findUnique({
      where: { id: parseInt(subIconId) },
      include: { icon: true }, // optional: include parent icon
    });

    if (!subIcon) return res.status(404).json({ message: "SubIcon not found" });

    res.json(subIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching subIcon", error: err.message });
  }
};

// Create SubIcon under a specific Icon
export const createSubIcon = async (req, res) => {
  try {
    const { iconId } = req.params;
    const { title, expression, iconName } = req.body;

    if (!title || !expression || !iconName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSubIcon = await prisma.subIcon.create({
      data: {
        title,
        expression,
        iconName,
        icon: { connect: { id: parseInt(iconId) } },
      },
    });

    res.status(201).json(newSubIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating subIcon", error: err.message });
  }
};

// Update SubIcon
export const updateSubIcon = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, expression, iconName } = req.body;

    const updatedSubIcon = await prisma.subIcon.update({
      where: { id: parseInt(id) },
      data: { title, expression, iconName },
    });

    res.json(updatedSubIcon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating subIcon", error: err.message });
  }
};

// Delete SubIcon
export const deleteSubIcon = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.subIcon.delete({ where: { id: parseInt(id) } });
    res.json({ message: "SubIcon deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting subIcon", error: err.message });
  }
};
