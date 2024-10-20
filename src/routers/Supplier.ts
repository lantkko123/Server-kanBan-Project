/** @format */

import { Router } from 'express';
import {
	addNew,
	getExportData,
	getForm,
	getSuppliers,
	removeSupplier,
	update,
} from '../controllers/supplier';

const router = Router();

router.get('/', getSuppliers);
// router.post('/get-export-data', getExportData);
router.post('/add-new', addNew);
router.put('/update', update);
router.delete('/remove', removeSupplier);
router.get('/get-form', getForm);

export default router;