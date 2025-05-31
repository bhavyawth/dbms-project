const { Router } = require('express');
const { 
  createListing,
  getAllListings,
  getListingById,
  updateListingById,
  deleteListingById,
  getMyListings,
} = require('../controllers/listingController');

const { protectedRoute } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', getAllListings);
//alag se upar cause conflicts with /:id
router.get('/my', protectedRoute('token'), getMyListings);

router.get('/:id', getListingById);

//protect
router.post('/', protectedRoute('token'), createListing);


router.put('/:id', protectedRoute('token'), updateListingById);

router.delete('/:id', protectedRoute('token'), deleteListingById);

module.exports = router;
