/* 
This file sets up an Express.js router that handles file uploads. When a POST request is made to the specified route,
the multer middleware is used to handle the file upload process. The uploaded file is saved to the 'frontend/public/images/' directory,
and a unique filename is generated for it. The file type is checked to ensure that only image files (jpg, jpeg, png) are allowed.
If the file is valid, its path is sent as the response.
*/

import path from 'path' // Importing the 'path' module from Node.js to work with file paths
import express from 'express' // Importing the 'express' module to create an Express.js application
import multer from 'multer' // Importing the 'multer' middleware for handling file uploads

const router = express.Router() // Creating an instance of an Express.js router

const storage = multer.diskStorage({
  destination(req, file, cb) { // Function to determine the destination directory for uploaded files
    cb(null, 'frontend/public/images/') // Setting the destination directory to 'frontend/public/images/'
  },
  filename(req, file, cb) { // Function to determine the filename for uploaded files
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` // Generating a unique filename using the original name and current timestamp
    )
  },
})

function checkFileType(file, cb) { // Function to check if the file type is valid
  const filetypes = /jpg|jpeg|png/ // Regular expression to define the allowed file types (jpg, jpeg, png)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) // Checking if the file extension matches the allowed types
  const mimetype = filetypes.test(file.mimetype) // Checking if the file's MIME type matches the allowed types

  if (extname && mimetype) { // If the file type is valid
    return cb(null, true) // Callback without an error and with the validation result (true)
  } else {
    cb('Images only!') // Callback with an error message indicating that only image files are allowed
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) { // Setting the file filter for multer middleware
    checkFileType(file, cb) // Calling the custom file type checker function
  },
})

router.post('/', upload.single('image'), (req, res) => { // Handling POST requests to the specified route
  res.send(`/${req.file.path}`) // Sending the path of the uploaded file as the response
})

export default router

