import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/verify.js';


const router = Router();


import authController from '../controller/authController.js';
import productController from '../controller/productController.js';
import storeController from '../controller/storeController.js';
// import stockController from '../controller/stockController.js';


// //------------------------------ login -------------------------------

router.post('/register', authController.register);
router.post('/login', authController.login);


// //----------------------------- Product ------------------------------

router.get('/products', requireAuth, productController.getProducts);
router.post('/products', requireAuth, requireAdmin, productController.createProduct);


// //------------------------------ Store -------------------------------

router.get('/stores', requireAuth, storeController.getStores);
router.post('/stores', requireAuth, requireAdmin, storeController.createStore);


// //--------------------------- Adjust Stock ----------------------------

// router.get('/stock', stockController.adjustStock);
// router.post('/stock/adjust', stockController.adjustStock);


// //--------------------------- Transfer ------------------------------

// router.post('/stock/transfer', stockController.transferStock);


export default router;