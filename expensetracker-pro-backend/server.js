require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// FRONTEND_URL can be a single URL or a comma-separated list, set as an
// environment variable on Render once the frontend is deployed to Vercel.
// Local dev origins are always allowed alongside it.
const defaultOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const configuredOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim())
  : [];
const allowedOrigins = [...defaultOrigins, ...configuredOrigins];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(logger);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Catch-all for unknown routes
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Must be registered last, after all routes.
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ExpenseTracker API running on http://localhost:${PORT}`);
});
