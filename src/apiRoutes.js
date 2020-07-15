import express from 'express';
const router = express.Router();

import adminController from './adminController';

// auth
router.post('/login', adminController.login)
router.post('/logout', adminController.logout)

export default router;
