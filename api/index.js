/**
 * @file api/index.js
 * @description all the exposed routes are here
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */




// modules import
const { Router } = require('express');

const { MIDDLE___, POST_____, GET______, PUT______, PATCH____, DELETE___, initializeRoute } = require('./utils');

const middleware = require('./middlewares');

const req_res = require('./routes/req_res');
const syoo_api = require('./routes/syoo_api');

module.exports = ({ sequelize }) => {

  const route = Router();

  initializeRoute(route, sequelize);

  //
  // ────────────────────────────────────────────────────────── ROUTES ───────
  //

  // ReqRes APIs
  MIDDLE___`/req_res/users                              ${middleware.basicAuth}`
  POST_____`/req_res/users                              ${req_res.users}`
  GET______`/req_res/users/:id                          ${req_res.users}`
  PUT______`/req_res/users/:id                          ${req_res.users}`
  DELETE___`/req_res/users/:id                          ${req_res.users}`


  // SYOO APIs
  POST_____`/syoo_api/restaurant                        ${syoo_api.restaurant}`
  GET______`/syoo_api/restaurant                        ${syoo_api.restaurant}`
  GET______`/syoo_api/restaurant/:id                    ${syoo_api.restaurant}`
  PUT______`/syoo_api/restaurant                        ${syoo_api.restaurant}`
  PUT______`/syoo_api/restaurant/:id                    ${syoo_api.restaurant}`
  
  POST_____`/syoo_api/order                             ${syoo_api.order}`
  GET______`/syoo_api/order                             ${syoo_api.order}`
  GET______`/syoo_api/order/:id                         ${syoo_api.order}`
  PATCH____`/syoo_api/order                             ${syoo_api.order}`
  PATCH____`/syoo_api/order/:id                         ${syoo_api.order}`

  GET______`/syoo_api/orders                            ${syoo_api.orders}`
  GET______`/syoo_api/orders/:id                        ${syoo_api.orders}`

  //
  // ─────────────────────────────────────────────────────────────────────────
  //


  return route;
};