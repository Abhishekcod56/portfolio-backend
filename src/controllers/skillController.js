const pool = require("../config/database");

// GET all skills
const getSkills = async (req, res) => {
  try {
    const [skills] = await pool.query(
      "SELECT * FROM skills ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skills"
    });
  }
};

// GET single skill
const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    const [skills] = await pool.query(
      "SELECT * FROM skills WHERE id = ?",
      [id]
    );

    if (skills.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }

    res.json({
      success: true,
      data: skills[0]
    });
  } catch (error) {
    console.error("Get skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch skill"
    });
  }
};

// CREATE skill
const createSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      proficiency,
      icon,
      description
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO skills
      (name, category, proficiency, icon, description)
      VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        category || null,
        proficiency || 0,
        icon || null,
        description || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      skillId: result.insertId
    });
  } catch (error) {
    console.error("Create skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create skill"
    });
  }
};

// UPDATE skill
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      proficiency,
      icon,
      description
    } = req.body;

    const [result] = await pool.query(
      `UPDATE skills SET
        name = ?,
        category = ?,
        proficiency = ?,
        icon = ?,
        description = ?
      WHERE id = ?`,
      [
        name,
        category,
        proficiency,
        icon,
        description,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }

    res.json({
      success: true,
      message: "Skill updated successfully"
    });
  } catch (error) {
    console.error("Update skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update skill"
    });
  }
};

// DELETE skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM skills WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
      });
    }

    res.json({
      success: true,
      message: "Skill deleted successfully"
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete skill"
    });
  }
};

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};