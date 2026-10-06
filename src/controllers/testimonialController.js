const pool = require("../config/database");

// GET all testimonials
const getTestimonials = async (req, res) => {
  try {
    const [testimonials] = await pool.query(
      "SELECT * FROM testimonials ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error("Get testimonials error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials"
    });
  }
};

// GET single testimonial
const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    const [testimonials] = await pool.query(
      "SELECT * FROM testimonials WHERE id = ?",
      [id]
    );

    if (testimonials.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found"
      });
    }

    res.json({
      success: true,
      data: testimonials[0]
    });
  } catch (error) {
    console.error("Get testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonial"
    });
  }
};

// CREATE testimonial
const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      position,
      company,
      message,
      image,
      rating,
      status
    } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO testimonials
      (
        name,
        position,
        company,
        message,
        image,
        rating,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        position || null,
        company || null,
        message,
        image || null,
        rating || 5,
        status || "published"
      ]
    );

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      testimonialId: result.insertId
    });
  } catch (error) {
    console.error("Create testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create testimonial"
    });
  }
};

// UPDATE testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      position,
      company,
      message,
      image,
      rating,
      status
    } = req.body;

    const [result] = await pool.query(
      `UPDATE testimonials SET
        name = ?,
        position = ?,
        company = ?,
        message = ?,
        image = ?,
        rating = ?,
        status = ?
      WHERE id = ?`,
      [
        name,
        position,
        company,
        message,
        image,
        rating,
        status,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found"
      });
    }

    res.json({
      success: true,
      message: "Testimonial updated successfully"
    });
  } catch (error) {
    console.error("Update testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update testimonial"
    });
  }
};

// DELETE testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM testimonials WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found"
      });
    }

    res.json({
      success: true,
      message: "Testimonial deleted successfully"
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial"
    });
  }
};

module.exports = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};