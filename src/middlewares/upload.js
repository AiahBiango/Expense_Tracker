// src/middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage settings for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Save files to the public/uploads/profile_photos directory
        const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads', 'profile_photos');
        
        // Ensure the directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
        }
        
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Rename the file with a unique timestamp
        const filename = `profilePhoto-${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Initialize the multer upload with file size limit (optional)
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

module.exports = upload;
