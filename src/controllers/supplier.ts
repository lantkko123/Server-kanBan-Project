/** @format */


import SupplierModel from '../models/SupplierModel';
import { supplierForm } from '../forms/supplier';
//  const getSuppliers = async (_req:any,res:any) => {
// 	try {
// 		const items = await SupplierModel.find({});

// 		res.status(200).json({
// 			message:'Products',
// 			data:items,
// 		});

// 	} catch (error:any) {
// 		res.status(404).json({
// 			message:error.message,
// 		});
// 	}
//  }
const getSuppliers = async (req: any, res: any) => {

	const { pageSize, page } = req.query;

	try {
		const skip = (page - 1) * pageSize;

		const items = await SupplierModel.find({ isDeleted: false })
			.skip(skip)
			.limit(pageSize);

		const total = await SupplierModel.countDocuments();

		res.status(200).json({
			message: 'Products',
			data: {
				total,
				items,
			},
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const getExportData = async (req: any, res: any) => {
	const body = req.body;
	const { start, end } = req.query;

	const filter: any = {};

	if (start && end) {
		filter.createdAt = {
			$lte: end,
			$gte: start,
		};
	}

	try {
		const items = await SupplierModel.find(filter);

		const data: any = [];
		if (items.length > 0) {
			items.forEach((item: any) => {
				const value: any = {};

				body.forEach((key: string) => {
					value[`${key}`] = `${item._doc[`${key}`] ?? ''}`;
				});

				data.push(value);
			});
		}

		res.status(200).json({
			message: 'Products',
			data: data,
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
// const addNew = async (req: any, res: any) => {
// 	const body = req.body;
// 	try {
// 		const newSupplier = new SupplierModel(body);
// 		newSupplier.save();
// 		res.status(200).json({
// 			message: 'Add new supplier successfully!!!',
// 			data: newSupplier,
// 		});
// 	} catch (error: any) {
// 		res.status(404).json({
// 			message: error.message,
// 		});
// 	}
// };
const addNew = async (req: any, res: any) => {
	const body = req.body;

	try {
		const newSupplier = new SupplierModel(body);

		await newSupplier.save();

		res.status(200).json({
			message: 'Supplier',
			data: newSupplier,
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const update = async (req: any, res: any) => {
	const body = req.body;
	const { id } = req.query;
	try {
		await SupplierModel.findByIdAndUpdate(id, body);

		res.status(200).json({
			message: 'Supplier updated',
			data: [],
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};

const removeSupplier = async (req: any, res: any) => {
	const { id } = req.query;
	try {
		await SupplierModel.findByIdAndDelete(id);

		res.status(200).json({
			message: 'Supplier removed',
			data: [],
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
// const removeSupplier = async (req: any, res: any) => {
// 	const { id } = req.query;

// 	try {
// 		const subItems = await SupplierModel.find({ isDeleted: id });

// 		if (subItems.length > 0) {
// 			await handleRemoveSupplier(subItems);
// 		}

// 		await SupplierModel.findByIdAndUpdate(id, {
// 			isDeleted: true,
// 		});

// 		res.status(200).json({
// 			message: 'Product removed!!',
// 		});
// 	} catch (error: any) {
// 		res.status(404).json({
// 			message: error.message,
// 		});
// 	}
// };

// const handleRemoveSupplier = async (items: any[]) => {
// 	items.forEach(async (item) => {
// 		await SupplierModel.findByIdAndUpdate(item._id, {
// 			isDeleted: true,
// 		});
// 	});
// };

const getForm = async (req: any, res: any) => {
	try {
		const form = {
			title: 'Supplier',
			layout: 'horizontal',
			labelCol: 6,
			wrapperCol: 18,
			formItems: supplierForm,
		};

		res.status(200).json({
			message: '',
			data: form,
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export { addNew, getSuppliers, update, removeSupplier, getForm, getExportData };