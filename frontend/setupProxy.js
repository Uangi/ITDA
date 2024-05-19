const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: process.env.address.backendaddress,
      changeOrigin: true,
    })
  );
};