const { Model } = require(`../parents/Model`);

const requiring = require;

class User extends Model {
  static get relationMappings() {
    const { Group } = requiring(`./Group`);
    const { UserGroup } = requiring(`./UserGroup`);

    return {
      groups: {
        relation: this.ManyToManyRelation,
        modelClass: Group,
        join: {
          from: `${this.tableName}.${this.idColumn}`,
          through: {
            from: `${UserGroup.tableName}.user_id`,
            to: `${UserGroup.tableName}.group_id`,
          },
          to: `${Group.tableName}.${Group.idColumn}`,
        },
      },
    };
  }
}

module.exports = { User };
