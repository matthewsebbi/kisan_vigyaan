import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 5173;
const DIST_DIR = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // Proxy all /api/* and /predict requests to Python ML Model / FastAPI server on port 8000
  if (req.url.startsWith('/api') || req.url.startsWith('/predict')) {
    // If it's a health check specifically intended for the node server, handle it
    if (req.url === '/api/frontend-health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ frontend: 'online', ml_server: 'http://localhost:8000' }));
      return;
    }

    const targetPath = req.url.startsWith('/api/predict') ? '/predict' : req.url;

    const proxyReq = http.request({
      hostname: '127.0.0.1',
      port: 8000,
      path: targetPath,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Backend ML Inference Service Unavailable', details: err.message }));
    });

    req.pipe(proxyReq, { end: true });
    return;
  }

  // Health check
  if (req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ frontend: 'online', ml_server: 'http://localhost:8000' }));
    return;
  }

  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(DIST_DIR, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`CropShield AI is running at http://localhost:${PORT}/`);
});
