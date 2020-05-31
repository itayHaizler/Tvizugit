import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLID,
} from "graphql";
import { GraphQLDate } from "graphql-compose";
import { UserType, UserInputType } from "../User/userType";
import { CategoryType } from "../Category/cateogryType";
import {MessageType, MessageInputType} from '../Message/messageType';

const UserListType = new GraphQLObjectType({
  name: "UserListType",
  fields: () => ({
    user: { type: UserType },
    isWaiting: { type: GraphQLBoolean }
  }),
});
const UserListInputType = new GraphQLInputObjectType({
  name: "UserListInputType",
  fields: () => ({
    user: { type: new GraphQLNonNull(GraphQLString) },
    isWaiting: { type: GraphQLBoolean }
  }),
});
const DefendantType = new GraphQLObjectType({
  name: "DefendantType",
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    theme: { type: GraphQLString }
  }),
});
const DefendantInputType = new GraphQLInputObjectType({
  name: "DefendantInputType",
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    theme: { type: GraphQLString }
  }),
});

const ClassActionType = new GraphQLObjectType({
  name: "ClassActionType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    category: { type: CategoryType },
    status: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserListType),
    },
    defendants: {
      type: new GraphQLList(DefendantType),
    },
    messages: {
      type: new GraphQLList(MessageType),
    },
    leadingUser: { type: UserType },
    type:{ type: GraphQLString },
    reason:{ type: GraphQLString },
    representingLawyer: { type: UserType },
    openDate: { type: GraphQLDate },
    reported: { type: GraphQLBoolean },
    reportMessage: { type: GraphQLString },  
    successChances: { type: GraphQLString },
    hashtags: { type: new GraphQLList(GraphQLString) }
  }),
});

const ClassActionInputType = new GraphQLInputObjectType({
  name: "ClassActionInputType",
  description: "Input payload for creating class action",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    category: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    defendants: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(DefendantInputType))
      ),
    },
    users: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(UserListInputType))
      ),
    },
    hashtags: {
      type: new GraphQLList(GraphQLString),
    },
    messages :{
      type: new GraphQLList(MessageInputType),
    },
    type:{ type: GraphQLString },
    reason:{ type: GraphQLString },
    leadingUser: { type: new GraphQLNonNull(GraphQLString) },
    representingLawyer: { type: GraphQLString },
    openDate: { type: GraphQLDate },
    successChances: { type: GraphQLString },
  }),
});

export { ClassActionInputType, ClassActionType };
