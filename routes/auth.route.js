import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js'; // 1. Added signin import

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin); // 2. Added the signin route

export default router;