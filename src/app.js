import express from 'express';
import userRoutes from './routes/UserRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import db from './config/db.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Node.js OOP CRUD API is running',
    endpoints: ['/users', '/products']
  });
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);

const startServer = async () => {
  try {
    const connection = await db.getConnection();
    connection.release();

    return app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return null;
  }
};

export { app, startServer };
export default app;
