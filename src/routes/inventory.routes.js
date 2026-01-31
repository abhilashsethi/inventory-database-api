import { Router } from 'express';
import {
  createInventory,
  getInventoryGroupedBySupplier,
} from '../controllers/inventory.controller.js';

const router = Router();

router.post('/', createInventory);
router.get('/', getInventoryGroupedBySupplier);

export default router;
