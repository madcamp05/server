const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { login } = require('./routes/login');

const app = express();

// CORS 설정
app.use(cors());

app.use(bodyParser.json());

app.post('/api/login', login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
