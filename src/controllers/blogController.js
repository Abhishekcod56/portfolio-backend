const pool = require("../config/database");

// GET all blogs
const getBlogs = async (req, res) => {
  try {
    const [blogs] = await pool.query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error("Get blogs error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs"
    });
  }
};

// GET single blog
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const [blogs] = await pool.query(
      "SELECT * FROM blogs WHERE id = ?",
      [id]
    );

    if (blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      data: blogs[0]
    });
  } catch (error) {
    console.error("Get blog error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch blog"
    });
  }
};

// CREATE blog
const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author,
      status,
      published_at
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO blogs
      (
        title,
        slug,
        excerpt,
        content,
        featured_image,
        author,
        status,
        published_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        excerpt || null,
        content || null,
        featured_image || null,
        author || null,
        status || "draft",
        published_at || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blogId: result.insertId
    });
  } catch (error) {
    console.error("Create blog error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create blog"
    });
  }
};

// UPDATE blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      author,
      status,
      published_at
    } = req.body;

    const [result] = await pool.query(
      `UPDATE blogs SET
        title = ?,
        slug = ?,
        excerpt = ?,
        content = ?,
        featured_image = ?,
        author = ?,
        status = ?,
        published_at = ?
      WHERE id = ?`,
      [
        title,
        slug,
        excerpt,
        content,
        featured_image,
        author,
        status,
        published_at,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      message: "Blog updated successfully"
    });
  } catch (error) {
    console.error("Update blog error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update blog"
    });
  }
};

// DELETE blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM blogs WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete blog"
    });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};