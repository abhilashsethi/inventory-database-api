import prisma from '../lib/prisma.js';

/**
 * POST /inventory
 */
export const createInventory = async (req, res) => {
  try {
    const { productName, quantity, price, supplierId } = req.body;

    if (!productName || quantity == null || price == null || !supplierId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (quantity <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity and price must be positive' });
    }

    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const inventory = await prisma.inventory.create({
      data: {
        productName,
        quantity,
        price,
        supplierId,
      },
    });

    res.status(201).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create inventory' });
  }
};

/**
 * GET /inventory
 * Group inventory by supplier and calculate total value
 */
export const getInventoryGroupedBySupplier = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: { inventory: true },
    });

    const result = suppliers
      .map((supplier) => {
        const totalValue = supplier.inventory.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );

        return {
          supplierId: supplier.id,
          supplierName: supplier.name,
          totalValue,
          inventory: supplier.inventory,
        };
      })
      .sort((a, b) => b.totalValue - a.totalValue);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
};
