const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/", {
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/ws", {
      target: "http://localhost:8080",
      changeOrigin: true,
      ws: true,
    })
  );
};
