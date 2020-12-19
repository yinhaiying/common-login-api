import koaJwt from "koa-jwt";
export const jwtSecret = "secret";
export const jwt = koaJwt({ secret: jwtSecret });