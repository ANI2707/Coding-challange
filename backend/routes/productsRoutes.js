import express from 'express';
import productsControllers from '../controller/productsControllers.js';
const router = express.Router();

router.get('/',productsControllers.products);
router.get('/statistics',productsControllers.statistics);
router.get('/barchart',productsControllers.barchart);
router.get('/piechart',productsControllers.piechart);
router.get('/combined',productsControllers.combined);


export default router;


