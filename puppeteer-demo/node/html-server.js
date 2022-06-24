var path = require('path');
const express = require('express');

const server = new express();

server.listen(3000, () => {
  console.log('server is running in 3000');
});

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../browser/index.html'));
});
