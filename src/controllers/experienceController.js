const pool = require("../config/database");

// GET all experience
const getExperiences = async (req, res) => {
  try {
    const [experiences] = await pool.query(
      "SELECT * FROM experience ORDER BY start_date DESC"
    );

    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    console.error("Get experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experience"
    });
  }
};

// GET single experience
const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const [experiences] = await pool.query(
      "SELECT * FROM experience WHERE id = ?",
      [id]
    );

    if (experiences.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Experience not found"
      });
    }

    res.json({
      success: true,
      data: experiences[0]
    });
  } catch (error) {
    console.error("Get experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experience"
    });
  }
};

// CREATE experience
const createExperience = async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      description,
      start_date,
      end_date,
      is_current,
      company_logo
    } = req.body;

    if (!company || !position) {
      return res.status(400).json({
        success: false,
        message: "Company and position are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO experience
      (
        company,
        position,
        location,
        description,
        start_date,
        end_date,
        is_current,
        company_logo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        company,
        position,
        location || null,
        description || null,
        start_date || null,
        end_date || null,
        is_current || false,
        company_logo || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      experienceId: result.insertId
    });
  } catch (error) {
    console.error("Create experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create experience"
    });
  }
};

// UPDATE experience
const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company,
      position,
      location,
      description,
      start_date,
      end_date,
      is_current,
      company_logo
    } = req.body;

    const [result] = await pool.query(
      `UPDATE experience SET
        company = ?,
        position = ?,
        location = ?,
        description = ?,
        start_date = ?,
        end_date = ?,
        is_current = ?,
        company_logo = ?
      WHERE id = ?`,
      [
        company,
        position,
        location,
        description,
        start_date,
        end_date,
        is_current,
        company_logo,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Experience not found"
      });
    }

    res.json({
      success: true,
      message: "Experience updated successfully"
    });
  } catch (error) {
    console.error("Update experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update experience"
    });
  }
};

// DELETE experience
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM experience WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Experience not found"
      });
    }

    res.json({
      success: true,
      message: "Experience deleted successfully"
    });
  } catch (error) {
    console.error("Delete experience error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete experience"
    });
  }
};

module.exports = {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
};