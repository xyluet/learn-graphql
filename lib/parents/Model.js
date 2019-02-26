const tableNamer = require(`@xyluet/objection-table-name`);
const { Model: ObjectionModel } = require(`objection`);

class Model extends tableNamer()(ObjectionModel) { }

module.exports = { Model };
