const { createProxyMiddleware } = require("http-proxy-middleware");
const { SERVER } = require("./util/Variables");

module.exports = (app) => {
  // app.use(
  //   createProxyMiddleware("/", {
  //     target: "http://localhost:8080",
  //     changeOrigin: true,
  //   })
  // );

  app.use(
    createProxyMiddleware("/ws", {
      target: `https://${SERVER}`,
      changeOrigin: true,
      ws: true,
    })
  );
};
