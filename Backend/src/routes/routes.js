import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/verify.js';


const router = Router();


// import authController from '../controller/userController/userController';
// import productController from '../controller/userController/homeController';
// import stockController from '../controller/userController/homeController';
// import storeController from '../controller/userController/homeController';


// //------------------------------ login -------------------------------

// router.post('/register', authController.register);
// router.post('/login', authController.login);


// //----------------------------- Product ------------------------------

// router.post('/products', productController.createProduct);
// router.get('/products', productController.getProducts);


// //------------------------------ Store -------------------------------

// router.get('/stores', storeController.getStores);
// router.post('/stores', storeController.createStore);


// //--------------------------- Adjust Stock ----------------------------

// router.get('/stock', stockController.adjustStock);
// router.post('/stock/adjust', stockController.adjustStock);


// //--------------------------- Transfer ------------------------------

// router.post('/stock/transfer', stockController.transferStock);


export default router;