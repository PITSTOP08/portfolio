require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const contactHandler = require('./api/contact');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/contact', contactHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});