const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const app = require('./app');

const port = process.env.PORT || 5000;

// db.connect();

app.listen(port, () =>
  console.log(`server is up and listening on port ${port}`)
);
