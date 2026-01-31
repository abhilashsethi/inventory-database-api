import express from 'express';
import cors from 'cors';
import supplierRoutes from './routes/supplier.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/supplier', supplierRoutes);
app.use('/inventory', inventoryRoutes);

export default app;
