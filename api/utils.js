const utils = require("../utils");
const {
  METHOD,
  POST,
  GET,
  PUT,
  PATCH,
  DELETE
} = require('./constants');

let route = {};
let sequelize = {};

const perform = (method, func) => async (req, res) => {
  const { url, method: met, body } = req;
  utils.info(met, url);
  utils.log(body);
  try {
    const ret = await func(method, req, res, { sequelize });
    res.send(ret);
  } catch (err) {
    utils.error(err);
    return res.json({ error: true, error_message: "Something went wrong..." }).status(500);
  }
}

const oneMoreRoute = (method, path, func) => {
  switch (method) {
    case METHOD[GET]:
      route.get(path, perform(method, func)); break;

    case METHOD[POST]:
      route.post(path, perform(method, func)); break;

    case METHOD[PUT]:
      route.put(path, perform(method, func)); break;

    case METHOD[PATCH]:
      route.patch(path, perform(method, func)); break;

    case METHOD[DELETE]:
      route.delete(path, perform(method, func)); break;

    case "middle":
      route.use(path, (req, res, next) => {
        try {
          func(method, req, res, next)
        } catch (err) {
          utils.error(err);
          return res.json({ error: true, error_message: "Something went wrong..." }).status(500);
        }
      }); break;

    default: break;
  }
};

const initializeRoute = (rt, sq) => {
  route = rt;
  sequelize = sq;
};

module.exports = {
  initializeRoute,
  MIDDLE___: (str, eval) => oneMoreRoute('MIDDLE', str[0].trim(), eval),
  POST_____: (str, eval) => oneMoreRoute(METHOD[POST], str[0].trim(), eval),
  GET______: (str, eval) => oneMoreRoute(METHOD[GET], str[0].trim(), eval),
  PUT______: (str, eval) => oneMoreRoute(METHOD[PUT], str[0].trim(), eval),
  PATCH____: (str, eval) => oneMoreRoute(METHOD[PATCH], str[0].trim(), eval),
  DELETE___: (str, eval) => oneMoreRoute(METHOD[DELETE], str[0].trim(), eval)
};