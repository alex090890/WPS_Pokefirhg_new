const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 4000;

app.use('/', routes);






app.listen(PORT, () => {
  console.log(`✅ Server is running :database: on port ${PORT}`);
});