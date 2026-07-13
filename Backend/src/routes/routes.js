import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/verify.js';


const router = Router();


import authController from '../controller/authController.js';
import productController from '../controller/productController.js';
// import stockController from '../controller/stockController.js';
// import storeController from '../controller/storeController.js';


// //------------------------------ login -------------------------------

router.post('/register', authController.register);
router.post('/login', authController.login);


// //----------------------------- Product ------------------------------

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);


// //------------------------------ Store -------------------------------

// router.get('/stores', storeController.getStores);
// router.post('/stores', storeController.createStore);


// //--------------------------- Adjust Stock ----------------------------

// router.get('/stock', stockController.adjustStock);
// router.post('/stock/adjust', stockController.adjustStock);


// //--------------------------- Transfer ------------------------------

// router.post('/stock/transfer', stockController.transferStock);


export default router;