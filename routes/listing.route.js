import express from 'express';
import { 
  createListing, 
  deleteListing, 
  getListing, 
  getListings 
} from '../controllers/listing.controller.js';

const router = express.Router();

// 1. CREATE - Adds a new property to the database
router.post('/create', createListing);

// 2. DELETE - Removes a listing by its ID
router.delete('/delete/:id', deleteListing);

// 3. GET SINGLE - Fetches one specific listing (for the Listing Details page)
router.get('/get/:id', getListing);

// 4. GET ALL - The search/filter endpoint used by the Homepage and Search page
router.get('/get', getListings); 

export default router;