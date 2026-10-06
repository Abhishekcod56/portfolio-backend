const pool = require("../config/database");

// GET all services
const getServices = async (req, res) => {
  try {
    const [services] = await pool.query(
      "SELECT * FROM services ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services"
    });
  }
};

// GET single service
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const [services] = await pool.query(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );

    if (services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      data: services[0]
    });
  } catch (error) {
    console.error("Get service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service"
    });
  }
};

// CREATE service
const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      icon
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO services
      (
        title,
        description,
        icon
      )
      VALUES (?, ?, ?)`,
      [
        title,
        description || null,
        icon || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      serviceId: result.insertId
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service"
    });
  }
};

// UPDATE service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      icon
    } = req.body;

    const [result] = await pool.query(
      `UPDATE services SET
        title = ?,
        description = ?,
        icon = ?
      WHERE id = ?`,
      [
        title,
        description,
        icon,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      message: "Service updated successfully"
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service"
    });
  }
};

// DELETE service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM services WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found"
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully"
    });
  } catch (error) {
    console.error("Delete service error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service"
    });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};