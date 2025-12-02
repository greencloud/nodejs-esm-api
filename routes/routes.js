import express from 'express';
const router = express.Router();

import apiAuth from '../middleware/apiAuth.js';
import { MainView } from '../controllers/main.cont.js';
import { listAll, getOne, saveProduct, updateOne, deleteOne } from '../controllers/products.cont.js';

router.get('/', MainView);
router.get('/api/all-products', apiAuth, listAll);
router.get('/api/product/:id', apiAuth, getOne);
router.put('/api/update-product/:id', apiAuth, updateOne);
router.post('/api/create-product', apiAuth, saveProduct);
router.delete('/api/delete-product/:id', apiAuth, deleteOne);

export default router;