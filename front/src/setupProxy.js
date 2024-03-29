const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: `${process.env.REACT_APP_API_DOMAIN}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api' 
      }
    })
  );
  app.use(
    createProxyMiddleware('/login', {
      target: `${process.env.REACT_APP_API_DOMAIN}`,
      changeOrigin: true,
      pathRewrite: {
        '^/login': '/login' 
      }
    })
  );
  app.use(
    createProxyMiddleware('/signup', {
      target: `${process.env.REACT_APP_API_DOMAIN}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/reIssueToken', {
      target: `${process.env.REACT_APP_API_DOMAIN}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/user', {
      target: `${process.env.REACT_APP_API_DOMAIN}`,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/tokenLogin', {
      target: `${process.env.REACT_APP_API_DOMAIN}`,
      changeOrigin: true,
    })
  );

};