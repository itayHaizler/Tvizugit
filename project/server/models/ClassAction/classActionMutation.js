import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { ClassActionType, ClassActionInputType } from "./classActionType";
import {
  addClassAction,
  updateClassAction,
  deleteClassAction,
  reportClassAction,
  cancelReportClassAction,
} from "./classActionBL";

const ClassActionMutation = new GraphQLObjectType({
  name: "ClassActionMutationType",
  fields: () => ({
    classAction: {
      type: ClassActionType,
      args: {
        id: { type: GraphQLString },
        classAction: { type: new GraphQLNonNull(ClassActionInputType) },
      },
      resolve: (root, { id, classAction }, context, ast) => {
        if (id) {
          return updateClassAction(id, classAction);
        } else {
          return addClassAction(classAction);
        }
      },
    },
    reportClassAction: {
      type: ClassActionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        reportMessage: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, params) => {
        return reportClassAction(params);
      },
    },
    cancelReportClassAction: {
      type: ClassActionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (root, params) => {
        return cancelReportClassAction(params);
      },
    },
    deleteClassAction: {
      type: ClassActionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (root, params) => {
        return deleteClassAction(params);
      },
    },
  }),
});

export default ClassActionMutation;
