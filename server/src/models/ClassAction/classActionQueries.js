import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import { ClassActionType } from "./classActionType";
import { getClassAction, getClassActionsByParams } from "./classActionBL";

const ClassActionQueries = new GraphQLObjectType({
  name: "ClassActionQueryType",
  fields: () => ({
    classAction: {
      type: ClassActionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (root, params, context, ast) => {
        return getClassAction(params);
      },
    },
    classActions: {
      type: new GraphQLList(ClassActionType),
      args: {
        name: {
          type: GraphQLString,
        },
        userId: {
          type: GraphQLString,
        },
        limit: {
          type: GraphQLInt
        }
      },
      resolve: (parentValue, params) => {
        return getClassActionsByParams(params);
      },
      
    },
  }),
});

export default ClassActionQueries;
