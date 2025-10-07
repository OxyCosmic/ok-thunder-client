const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the dist/frontend directory (Angular 12 outputs to dist/<project-name>)
app.use(express.static(path.join(__dirname, 'dist/frontend')));

// Handle all routes - return index.html for Angular routing
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/frontend/index.html'));
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`🚀 Frontend server is running on port ${PORT}`);
});