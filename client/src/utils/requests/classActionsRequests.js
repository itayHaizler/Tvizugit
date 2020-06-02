import { gql } from "apollo-boost";

const updateClassActionServer = gql`
mutation ($classAction: ClassActionInputType!, $id: String) {
  ClassActionMutation {
    classAction(classAction: $classAction, id: $id) {
      id
      name
      description
      category{
        id
        name
        engName
      }
      defendants{
        name
        type
        theme
      }
      messages{
        _id
        title
        date
        content
      }
      users {
        user{
        id
        name
        }
        isWaiting
      }
      status
      leadingUser {
        id
        name
      }
      openDate
      reason
      type
      successChances
      hashtags
    }
  }
}
`;
const addClassAction = gql`
mutation ($classAction:ClassActionInputType!){
  ClassActionMutation{
    classAction(classAction:$classAction){
      id
    }
  }
}
`;

const REPORT = gql`
mutation reportClassAction($id: String!, $reportMessage: String!) {
  ClassActionMutation{
    reportClassAction(id:$id, reportMessage: $reportMessage) {
      id
      name
      description
      category{
        id
        name
        engName
      }
      defendants{
        name
        type
        theme
      }
      messages{
        id
        title
        date
        content
      }
      users {
        user{
        id
        name
        }
        isWaiting
      }
      status
      leadingUser {
        id
        name
      }
      reported
      reason
      type
      reportMessage
      openDate
      successChances
      hashtags
    }
  }
}
`;

export default {
  updateClassActionServer,
  addClassAction,
  REPORT,
};
