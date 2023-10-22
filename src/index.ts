import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';

const PORT = process.env.PORT || 3000; // Adding a fallback value in case the PORT variable is not set

app.listen(PORT, () => {
  console.log(`Welcome to my Kanban API, listening on port ${PORT}`);
});
