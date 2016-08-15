'use strict';

const app = require('./app.js');

const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
