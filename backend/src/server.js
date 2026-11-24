import app from './app.js';
import { pool } from './config/database.js';

const port = Number(process.env.PORT || 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const server = app.listen(port, () => {
  console.log(`TressTech API listening on port ${port}.`);
});

let isShuttingDown = false;

function shutdown() {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  server.close((serverError) => {
    if (serverError) {
      console.error('Failed to close the HTTP server.', serverError);
      process.exitCode = 1;
    }

    pool
      .end()
      .then(() => {
        console.log('Database pool closed.');
      })
      .catch((databaseError) => {
        console.error('Failed to close the database pool.', databaseError);
        process.exitCode = 1;
      });
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
