import prisma from '../lib/prisma.js';

/**
 * POST /supplier
 */
export const createSupplier = async (req, res) => {
  try {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({ message: 'Name and city are required' });
    }

    const supplier = await prisma.supplier.create({
      data: { name, city },
    });

    res.status(201).json(supplier);
  } catch (error) {
    console.error('PRISMA ERROR >>>', error);
    return res.status(500).json({
      message: error.message,
      code: error.code,
    });
  }
};

/**
 * GET /supplier
 */
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch suppliers' });
  }
};
