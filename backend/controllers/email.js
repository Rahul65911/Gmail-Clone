const { Email } = require("../models/email");

const createEmail = async (req, res) => {
  try {
    const { from, to, subject, message } = req.body;
    if (!from || !to || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const email = await Email.create({
      from,
      to,
      subject,
      message,
      createdBy: req.id,
    });

    if (!email) {
      return res.status(500).json({
        message: "Internal server Error",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Email created successfully",
      success: true,
      email,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while creating email",
    });
  }
};

const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;

    const email = await Email.findByIdAndDelete({
      _id: id,
    });

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting email",
    });
  }
};

const getAllEmail = async (req, res) => {
  try {
    const mailId = req.query.emailId;
    const emails = await Email.find({ to: mailId });

    return res.status(200).json({
      success: true,
      emails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while fatching emails",
    });
  }
};

const getSentEmail = async (req, res) => {
  try {
    const emails = await Email.find({ from: req.query.emailId });

    return res.status(200).json({
      success: true,
      emails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while fatching emails",
    });
  }
};

module.exports = {
  createEmail,
  deleteEmail,
  getAllEmail,
  getSentEmail
};
