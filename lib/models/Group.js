const { Model } = require(`../parents/Model`);

const requiring = require;

class Group extends Model {
  static get relationMappings() {
    const { User } = requiring(`./User`);
    const { UserGroup } = requiring(`./UserGroup`);

    return {
      users: {
        relation: this.ManyToManyRelation,
        modelClass: User,
        join: {
          from: `${this.tableName}.${this.idColumn}`,
          through: {
            from: `${UserGroup.tableName}.group_id`,
            to: `${UserGroup.tableName}.user_id`,
          },
          to: `${User.tableName}.${User.idColumn}`,
        },
      },
    };
  }
}

module.exports = { Group };
