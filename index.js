/**
 * @file index.js
 * @description Entry point of App
 * 
 * @author Arth Gajjar <iarthstar@gmail.com>
 * @version 1.0
 */




//
// ────────────────────────────────────────────────────────── INIT APP ─────
//

const utils = require("./utils");
utils.initApp();

// modules import
const config = require('./config');
const loaders = require('./loaders');
const G = require('./global');

const startServer = async () => {

  await loaders();

  G.EXPRESS_APP.listen(config.server.PORT, err => {
    if (err) utils.log(err);
    else utils.info('Server', `http://localhost:${config.server.PORT}`);
  });
};

startServer();