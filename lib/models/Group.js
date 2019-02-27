const { Model } = require(`../parents/Model`);
const { User } = require(`./User`);
const { UserGroup } = require(`./UserGroup`);

class Group extends Model {
  static get relationMappings() {
    return {
      users: {
        relation: this.HasManyRelation,
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
