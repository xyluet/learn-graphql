const graphql = require(`graphql`);
const faker = require(`faker`);
const graphqlHTTP = require(`koa-graphql`);

const app = require(`./app`);
const router = require(`./router`);

const users = new Map();
let ID = 1;
for (let i = 0; i < 10; i++) {
  users.set(ID++, {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  });
}
class User {
  constructor(id, {
    firstName,
    lastName,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const userType = new graphql.GraphQLObjectType({
  name: `UserType`,
  fields: {
    id: { type: graphql.GraphQLInt },
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
  },
});

const queryType = new graphql.GraphQLObjectType({
  name: `Query`,
  fields: {
    getUser: {
      type: userType,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
      },
      resolve: (_, { id }) => {
        if (!users.has(id)) {
          throw new Error(`User not found`);
        }
        return new User(id, users.get(id));
      }
    },

    getUsers: {
      type: new graphql.GraphQLList(userType),
      resolve: (_, args) => {
        const output = [];
        for (const [id, user] of users) {
          output.push(new User(id, user));
        }
        return output;
      }
    }
  },
});

const userInput = new graphql.GraphQLInputObjectType({
  name: `UserInput`,
  fields: {
    firstName: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    lastName: { type: graphql.GraphQLString },
  },
});

const mutationType = new graphql.GraphQLObjectType({
  name: `Mutation`,
  fields: ({
    createUser: {
      type: userType,
      args: {
        input: { type: userInput }
      },
      resolve: (_, { input }) => {
        const id = ID++;
        users.set(id, input);
        return new User(id, input);
      }
    },

    updateUser: {
      type: userType,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        input: { type: new graphql.GraphQLNonNull(userInput) },
      },
      resolve: (_, { id, input }) => {
        if (!users.has(id)) {
          throw new Error(`User not found`);
        }

        users.set(id, input);
        return new User(id, input);
      }
    },

    deleteUser: {
      type: userType,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
      },
      resolve: (_, { id }) => {
        if (!users.has(id)) {
          throw new Error(`User not found`);
        }

        const user = users.get(id);
        users.delete(id);
        return new User(id, user);
      }
    },
  }),
});

const schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

// const root = {
//   getUser({ id }) {
//     if (!users.has(id)) {
//       throw new Error(`User not found`);
//     }

//     return new User(id, users.get(id));
//   },
//   getUsers() {
//     const output = [];
//     for (const [id, user] of users) {
//       output.push(new User(id, user));
//     }

//     return output;
//   },
//   createUser({ input }) {
//     const id = ID++;
//     users.set(id, input);
//     return new User(id, input);
//   },
//   updateUser() {

//   },
//   deleteUser({ id }) {
//     if (!users.has(id)) {
//       throw new Error(`User not found`);
//     }
//     const user = users.get(id);
//     users.delete(id);
//     return new User(id, user);
//   }
// };

router.all(`/graphql`, graphqlHTTP({
  schema,
  graphiql: true,
}));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
