import ClassActionModel from "./classActionModel";

function addClassAction(classActionToAdd) {
  const newClassAction = new ClassActionModel(classActionToAdd);
  return newClassAction.save();
}

function deleteClassAction({ id }) {
  return ClassActionModel.deleteOne({ _id: id });
}

function updateClassAction(id, classActionToAdd) {
  ClassActionModel.findOneAndUpdate({ _id: id }, classActionToAdd);
  return ClassActionModel.findOne({ _id: id })
    .populate("category")
    .populate("leadingUser")
    .populate("users");
}

function getClassAction({ id }) {
  return ClassActionModel.findOne({ _id: id })
    .populate("category")
    .populate("leadingUser")
    .populate("users");
}


function getAllClassActions() {
  return ClassActionModel.find({})
    .populate("category")
    .populate("leadingUser")
    .populate("users");
}

export {
  addClassAction,
  getClassAction,
  getAllClassActions,
  updateClassAction,
  deleteClassAction,
};
