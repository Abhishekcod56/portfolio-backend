const pool = require("../config/database");

// GET About
const getAbout = async (req, res) => {
  try {
    const [about] = await pool.query(
      "SELECT * FROM about ORDER BY id DESC LIMIT 1"
    );

    if (about.length === 0) {
      return res.status(404).json({
        success: false,
        message: "About information not found"
      });
    }

    res.json({
      success: true,
      data: about[0]
    });
  } catch (error) {
    console.error("Get about error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch about information"
    });
  }
};

// UPDATE About
const updateAbout = async (req, res) => {
  try {
    const {
      title,
      description,
      profile_image,
      email,
      phone,
      location
    } = req.body;

    const [about] = await pool.query(
      "SELECT id FROM about ORDER BY id DESC LIMIT 1"
    );

    if (about.length === 0) {
      return res.status(404).json({
        success: false,
        message: "About information not found"
      });
    }

    const id = about[0].id;

    await pool.query(
      `UPDATE about SET
        title = ?,
        description = ?,
        profile_image = ?,
        email = ?,
        phone = ?,
        location = ?
      WHERE id = ?`,
      [
        title,
        description,
        profile_image,
        email,
        phone,
        location,
        id
      ]
    );

    res.json({
      success: true,
      message: "About information updated successfully"
    });
  } catch (error) {
    console.error("Update about error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update about information"
    });
  }
};

module.exports = {
  getAbout,
  updateAbout
};