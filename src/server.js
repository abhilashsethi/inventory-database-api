import dotenv from 'dotenv';
dotenv.config(); // ✅ MUST be first

import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
