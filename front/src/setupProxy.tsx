import {createProxyMiddleware}  from 'http-proxy-middleware';

module.exports = function (app: any) {
    app.use(
        createProxyMiddleware(
            "/api", {
                target: `${process.env.REACT_APP_API_DOMAIN}`,
        }),
        createProxyMiddleware(
            "/user", {
                target: `${process.env.REACT_APP_API_DOMAIN}`,
        }),
        createProxyMiddleware(
            "/login", {
                target: `${process.env.REACT_APP_API_DOMAIN}`,
        }),
        createProxyMiddleware(
            "/tokenLogin", {
                target: `${process.env.REACT_APP_API_DOMAIN}`,
        }),
        createProxyMiddleware(
            "/signup", {
                target: `${process.env.REACT_APP_API_DOMAIN}`,
        }),
        createProxyMiddleware(
            "/reIssueToken", {
                target: `${process.env.REACT_APP_API_DOMAIN}`,
        }),
    )
}