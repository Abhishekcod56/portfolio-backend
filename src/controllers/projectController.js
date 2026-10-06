const pool = require("../config/database");

// GET all projects
const getProjects = async (req, res) => {
  try {
    const [projects] = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects"
    });
  }
};


// GET single project
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const [projects] = await pool.query(
      "SELECT * FROM projects WHERE id = ?",
      [id]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.json({
      success: true,
      data: projects[0]
    });
  } catch (error) {
    console.error("Get project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project"
    });
  }
};


// CREATE project
const createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      image,
      github_url,
      live_url,
      technologies,
      status,
      featured
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO projects
      (
        title,
        slug,
        description,
        image,
        github_url,
        live_url,
        technologies,
        status,
        featured
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        description || null,
        image || null,
        github_url || null,
        live_url || null,
        technologies || null,
        status || "published",
        featured || false
      ]
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      projectId: result.insertId
    });
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create project"
    });
  }
};


// UPDATE project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      description,
      image,
      github_url,
      live_url,
      technologies,
      status,
      featured
    } = req.body;

    const [result] = await pool.query(
      `UPDATE projects SET
        title = ?,
        slug = ?,
        description = ?,
        image = ?,
        github_url = ?,
        live_url = ?,
        technologies = ?,
        status = ?,
        featured = ?
      WHERE id = ?`,
      [
        title,
        slug,
        description,
        image,
        github_url,
        live_url,
        technologies,
        status,
        featured,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully"
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update project"
    });
  }
};


// DELETE project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM projects WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete project"
    });
  }
};


module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};