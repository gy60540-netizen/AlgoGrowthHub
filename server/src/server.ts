import { app } from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

async function startServer() {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`🚀 AlgoGrowthHub API Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    console.log(`📡 Health check available at: http://localhost:${env.PORT}/api/health`);
  });

  // Graceful shutdown
  const handleShutdown = (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      console.log('✅ HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

startServer().catch((err) => {
  console.error('Fatal Server Error:', err);
  process.exit(1);
});
