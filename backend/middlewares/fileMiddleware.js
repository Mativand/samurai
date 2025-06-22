const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = Date.now() + ext; // or any other logic to generate unique file names
        cb(null, fileName);
    },
});

const upload = multer(
    {
        storage,
        limits: {
            fileSize: 1024 * 1024 * 25, // Max file size 25MB
        },
    },
);

const deleteFile = (file) => {
    fs.unlink(file.path, (err) => {
        if (err) {
            console.error(err);
            throw new Error('Failed to delete file');
        }
    });
};

const acceptedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    // 'video/mp4',
    // 'video/quicktime',
    // 'video/webm',
    // 'application/pdf',
    // 'application/msword',
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // 'application/vnd.ms-powerpoint',
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

// Membuat fungsi validasi file
const validateFileTypes = (file) => acceptedFileTypes.includes(file.mimetype);

module.exports = { upload, deleteFile, validateFileTypes };
