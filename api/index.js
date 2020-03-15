/**
 * @file api/index.js
 * @description all the exposed routes are here
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 */




// modules import
const { Router } = require('express');
const G = require('../global');

const { MIDDLE___, POST_____, GET______, PUT______, PATCH____, DELETE___ } = require('./utils');

const middleware = require('./middlewares');

const req_res = require('./routes/req_res');
const syoo_api = require('./routes/syoo_api');

module.exports = () => {

  G.ROUTE = Router();

  //
  // ─────────────────────────────────────────────────────────── ROUTES ───────
  //

  /*------------------- REQRES APIs -------------------*/

  // ReqRes CRUD
  MIDDLE___`/req_res/users                              ${middleware.basicAuth}`
  POST_____`/req_res/users                              ${req_res.users}`
  GET______`/req_res/users/:id                          ${req_res.users}`
  PUT______`/req_res/users/:id                          ${req_res.users}`
  DELETE___`/req_res/users/:id                          ${req_res.users}`





  /*-------------------- SYOO APIs --------------------*/

  // Restaurant CRUD
  POST_____`/syoo_api/restaurant                        ${syoo_api.restaurant}`
  GET______`/syoo_api/restaurant                        ${syoo_api.restaurant}`
  GET______`/syoo_api/restaurant/:id                    ${syoo_api.restaurant}`
  PUT______`/syoo_api/restaurant                        ${syoo_api.restaurant}`
  PUT______`/syoo_api/restaurant/:id                    ${syoo_api.restaurant}`
  DELETE___`/syoo_api/restaurant                        ${syoo_api.restaurant}`
  DELETE___`/syoo_api/restaurant/:id                    ${syoo_api.restaurant}`
  
  // Restaurants
  GET______`/syoo_api/restaurants                       ${syoo_api.restaurants}`

  // Item CRUD
  POST_____`/syoo_api/item                              ${syoo_api.item}`
  GET______`/syoo_api/item                              ${syoo_api.item}`
  GET______`/syoo_api/item/:id                          ${syoo_api.item}`
  PUT______`/syoo_api/item                              ${syoo_api.item}`
  PUT______`/syoo_api/item/:id                          ${syoo_api.item}`
  DELETE___`/syoo_api/item                              ${syoo_api.item}`
  DELETE___`/syoo_api/item/:id                          ${syoo_api.item}`

  // Items
  GET______`/syoo_api/items                             ${syoo_api.items}`
  GET______`/syoo_api/items/:id                         ${syoo_api.items}`

  // Table CRUD
  POST_____`/syoo_api/table                             ${syoo_api.table}`
  GET______`/syoo_api/table                             ${syoo_api.table}`
  GET______`/syoo_api/table/:id                         ${syoo_api.table}`
  PUT______`/syoo_api/table                             ${syoo_api.table}`
  PUT______`/syoo_api/table/:id                         ${syoo_api.table}`
  DELETE___`/syoo_api/table                             ${syoo_api.table}`
  DELETE___`/syoo_api/table/:id                         ${syoo_api.table}`

  // Tables
  GET______`/syoo_api/tables                            ${syoo_api.tables}`
  GET______`/syoo_api/tables/:id                        ${syoo_api.tables}`

  // Order CRUD
  POST_____`/syoo_api/order                             ${syoo_api.order}`
  GET______`/syoo_api/order                             ${syoo_api.order}`
  GET______`/syoo_api/order/:id                         ${syoo_api.order}`
  PUT______`/syoo_api/order                             ${syoo_api.order}`
  PUT______`/syoo_api/order/:id                         ${syoo_api.order}`
  PATCH____`/syoo_api/order                             ${syoo_api.order}`
  PATCH____`/syoo_api/order/:id                         ${syoo_api.order}`
  
  // Orders
  GET______`/syoo_api/orders                            ${syoo_api.orders}`
  GET______`/syoo_api/orders/:id                        ${syoo_api.orders}`

  //
  // ──────────────────────────────────────────────────────────────────────────
  //


  return G.ROUTE;
};