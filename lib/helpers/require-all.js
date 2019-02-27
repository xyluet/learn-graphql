const requirerAll = require(`require-all`);

module.exports = dir => requirerAll({
  dirname: dir,
  resolve(something) {
    return something[Object.keys(something)[0]];
  },
});
