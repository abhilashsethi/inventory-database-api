import { Router } from 'express';
import { createSupplier, getSuppliers } from '../controllers/supplier.controller.js';

const router = Router();

router.post('/', createSupplier);
router.get('/', getSuppliers);

export default router;
