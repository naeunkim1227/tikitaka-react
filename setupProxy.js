const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        "/tiki",
        createProxyMiddleware({
            target: "http://localhost:8080/TT"
        })
    )
}