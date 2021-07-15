const fs = require('fs');
const path = require('path');
const { validateAuthorization } = require('./jwt');
const { validatePermission } = require('./permissions');

const parseObject = (list, dir) =>
  list.reduce((acc, value) => {
    const routes = fs.readdirSync(`${dir}/${value}`);

    for (const route of routes) {
      acc.push({
        object: route,
        root: `${value}`,
        dir: `${dir}/${value}/${route}`,
      });
    }

    acc = acc.filter((a) => a.object !== 'case.js');
    return acc;
  }, []);

const orderByExpressRoutes = (list) => {
  const params = [];
  const notParams = [];

  for (let i = 0; i < list.length; i++) {
    const val = list[i];
    const c = require(val.dir);
    if (c.path.search(':') > 0) params.push(c);
    else notParams.push(c);
  }

  return [...notParams, ...params];
};

const generateRoute = (list, app) =>
  list.map((val) => {
    let args = [`/api${val.path}`];
    if (typeof val.authenticate === 'string')
      val.authenticate = val.authenticate === 'true';
    if (val.authenticate || val.authenticate === 'true')
      args = args.concat(validateAuthorization);
    if (val.permission) args = args.concat(validatePermission(val.permission));
    args = args.concat(val.middleware);
    args.push(val.handler);
    app._router[val.method.toLowerCase()].apply(app._router, args);
  });

module.exports = (app) => {
  try {
    const dir = path.join(__dirname, '../controllers');
    const listRoutes = fs.readdirSync(dir);

    const parse = parseObject(listRoutes, dir);
    const orderByExpress = orderByExpressRoutes(parse);

    generateRoute(orderByExpress, app);
  } catch (error) {
    console.error(error);
    console.warn(`Error in generate modules routes express: ${error.message}`);
  }
};
