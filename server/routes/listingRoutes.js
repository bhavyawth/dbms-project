const { Router } = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { 
  createListing,
  getAllListings,
  getListingById,
  updateListingById,
  deleteListingById,
  getMyListings,
  handleUploadImages,
  getListingsByLocation,
} = require('../controllers/listingController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const listingId = req.params.id; 
    const dir = `public/images/${listingId}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });


const { protectedRoute } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', getAllListings);
//alag se upar cause conflicts with /:id
router.get('/my', protectedRoute('token'), getMyListings);

router.get('/search', getListingsByLocation);

router.get('/:id', getListingById);

//protect
router.post('/', protectedRoute('token'), createListing);

router.post('/:id/upload', protectedRoute('token'), upload.array('images', 5), handleUploadImages)

router.put('/:id', protectedRoute('token'), updateListingById);

router.delete('/:id', protectedRoute('token'), deleteListingById);



module.exports = router;
