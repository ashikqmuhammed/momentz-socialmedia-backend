const fs = require("fs");
module.exports = function (req, res, next) {
  try {
    if (!req.files || Object.values(req.files).flat().lenght === 0) {
      return res.status(400).json({ message: "No files selected" });
    }
    const files = Object.values(req.files).flat();
    try {
    } catch (error) {}
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmpFile(file.tempFilePath);
        return res.status(400).json({ message: "Unsupported format" });
      }

      if (file.size > 1024 * 1024 * 5) {
        removeTmpFile(file.tempFilePath);
        return res.status(400).json({ message: "File size is too large" });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTmpFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
