import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, _file, cb) {
    let path = process.env.FILE_UPLOAD_DIRECTORY as string;

    // Store the file in the right directory depending on the type of upload
    if (req.params.type === 'election') {
      path += 'elections';
    } else if (req.params.type === 'candidate') {
      path += 'candidates';
    }

    cb(null, path);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    // Generate a random ID for this file
    cb(
      null,
      file.fieldname +
        '-' +
        uniqueSuffix +
        '.' +
        file.originalname.split('.').pop(),
    );
  },
});

export const upload = multer({ storage: storage });
