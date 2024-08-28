const corsOptions = {
  origin: process.env.CORS_ALLOW_ORIGIN || '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
};

module.exports = corsOptions;
