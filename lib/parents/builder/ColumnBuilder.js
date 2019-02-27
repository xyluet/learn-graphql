const ID_TYPE = `BINARY(16)`;

class ColumnBuilder {
  constructor(table) {
    this.table = table;
  }

  string(name, length = 255) {
    this.table.string(name, length);
  }

  primaryKey(name = `id`) {
    this.table.specificType(name, ID_TYPE).primary();
  }

  foreignKey(name) {
    this.table.specificType(name, ID_TYPE);
  }
}

module.exports = { ColumnBuilder };
