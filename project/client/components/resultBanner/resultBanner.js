import React, { useState } from "react";
import FBShare from "../FBShare/FBshare";
import classes from "./resultBanner.module.css";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import EditLawyer from "../LawyersStock/Lawyers/Lawyer/EditLawyer/EditLawyer"
import IconButton from "@material-ui/core/IconButton";
import {
  Delete,
  ExpandMore,
  Edit,
  Report,
  RemoveCircle,
} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteClassAction,
  updateClassAction,
  changeCurAction,
} from "../../store/classAction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { useMutation } from "@apollo/react-hooks";
import { classActionsRequest } from "../../utils/requests";
import { resultTypes } from "../../utils/globalConsts";
import AlertUser from "../alertUser/alertUser";

export default function ResultBanner(props) {
  // Initialize state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelReportDialogOpen, setCancelReportDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [editLawyerOpen, setEditLawyerOpen] = useState(false);
  const [reportedAlertOpen, setReportedAlert] = useState(false);
  const [deletedAlertOpen, setDeletedAlert] = useState(false);

  // Initialize mutations
  const [reportClassAction] = useMutation(classActionsRequest.REPORT);
  const [cancelReport] = useMutation(classActionsRequest.CANCEL_REPORT);
  const [deleteReport] = useMutation(classActionsRequest.DELETE_CLASS_ACTION_MUTATION);
  
  const filter = useSelector((state) => state.classAction.filter);
  let name = filter.name;
  let categories = filter.categories;
  let hashtags = filter.hashtags;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const resultBannerType = props.entityType;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const hadleDeleteClassAction = (entityId) => {
    deleteReport({ variables: { id: entityId } }).then((data => {
      setDeletedAlert(true)

      if (resultBannerType === resultTypes.REPORTED_CLASS_ACTION) {
        props.cancelReport(entityId, true);
      } else {
        props.refetch(name, categories, hashtags);
      }
    }));


    setDeleteDialogOpen(false);
  };

  const hadleCancelReport = (classActionId) => {
    cancelReport({
      variables: {
        id: classActionId,
      },
    }).then((data) => {
      props.cancelReport(classActionId);
      dispatch(
        updateClassAction(data.data.ClassActionMutation.reportClassAction)
      );
      dispatch(changeCurAction({}));
    });
    setCancelReportDialogOpen(false);
  };

  const hadleReportClassAction = (entityId) => {
    reportClassAction({
      variables: {
        id: entityId,
        reportMessage: reportMessage,
      },
    }).then((data) => {
      dispatch(
        updateClassAction(data.data.ClassActionMutation.reportClassAction)
      );
      dispatch(changeCurAction({}));
      setReportedAlert(true);      
    });
    setReportDialogOpen(false);
  };

  let combinedPropertiesToShow = props.selectedProperties.map((p) => {
    return (
      <CardHeader
        className={classes.cellInRow}
        title={p.content}
        subheader={p.name}
        key={p.engName}
      />
    );
  });

  return (
    <Card className={classes.root}>
      <div className={classes.rootDiv}>
        {props.showBookmark ? (
          <div style={{ backgroundColor: "#009688", width: "10px" }} />
        ) : null}
        {props.imgUrl ? (
          <Avatar className={classes.img} src={props.imgUrl}></Avatar>
        ) : null}
        {combinedPropertiesToShow}
        <CardActions disableSpacing>
          {resultBannerType === resultTypes.REPORTED_CLASS_ACTION && (
            <div>
              <IconButton onClick={() => setCancelReportDialogOpen(true)}>
                <RemoveCircle />
              </IconButton>
              <Dialog
                open={cancelReportDialogOpen}
                onClose={() => setCancelReportDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  האם ברצונך לדחות את הדיווח?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ביטול הדיווח ישאיר את התביעה במערכת ומהווה אישור שלא היה
                    סיבה למחוק את התביעה לפי הדיווח שהתקבל
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setCancelReportDialogOpen(false)}
                    color="primary"
                  >
                    וואלה התחרטתי
                  </Button>
                  <Button
                    onClick={() => hadleCancelReport(props.entityId)}
                    color="primary"
                    autoFocus
                  >
                    כן
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
          {resultBannerType === resultTypes.CLASS_ACTION && props.editAuth && (
            <IconButton onClick={() => props.handleOpenEditAction()}>
              <Edit />
            </IconButton>
          )}
          {resultBannerType === resultTypes.CLASS_ACTION && (
            <div>
              <IconButton onClick={() => setReportDialogOpen(true)}>
                <Report />
              </IconButton>
              <Dialog
                open={reportDialogOpen}
                onClose={() => setReportDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  האם ברצונך לדווח על התביעה?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    דיווח על תביעה מגיע למנהלי המערכת שלנו ובהתאם לפירוט נבחן את
                    טענתך ונטפל בהתאם
                  </DialogContentText>
                  <TextField
                    onChange={(event) => setReportMessage(event.target.value)}
                    autoFocus
                    margin="dense"
                    variant="outlined"
                    rows={4}
                    id="reportDesc"
                    label="פירוט הדיווח"
                    fullWidth
                    multiline
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setReportDialogOpen(false)}
                    color="primary"
                  >
                    וואלה התחרטתי
                  </Button>
                  <Button
                    onClick={() => hadleReportClassAction(props.entityId)}
                    color="primary"
                    autoFocus
                  >
                    כן
                  </Button>
                </DialogActions>
              </Dialog>
              <AlertUser open={reportedAlertOpen} handleClose={() => setReportedAlert(false)} message="הדיווח הושלם בהצלחה!" severity="success" />
            </div>
          )}
          {(resultBannerType === resultTypes.CLASS_ACTION ||
            resultBannerType === resultTypes.REPORTED_CLASS_ACTION) &&
            Object.keys(loggedInUser).length !== 0 &&
            loggedInUser.role.engName === "admin" && (
              <div>
                <IconButton
                  aria-label="delete"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Delete />
                </IconButton>
                <Dialog
                  open={deleteDialogOpen}
                  onClose={() => setDeleteDialogOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    בוודאות בא לך למחוק? אין חרטות
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      לאחר אישור המחיקה התובענה תמחק ואף משתמש לא יוכל לצפות בה
                      יותר.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setDeleteDialogOpen(false)}
                      color="primary"
                    >
                      וואלה התחרטתי
                    </Button>
                    <Button
                      onClick={() => hadleDeleteClassAction(props.entityId)}
                      color="primary"
                      autoFocus
                    >
                      כן
                    </Button>
                  </DialogActions>
                </Dialog>
                <AlertUser open={deletedAlertOpen} handleClose={() => setDeletedAlert(false)} message="התביעה נמחקה בהצלחה!" severity="success" />
              </div>
            )}
          {resultBannerType === resultTypes.LAWYER && loggedInUser.email === props.lawyer.email && (
            <div>
              <IconButton onClick={() => setEditLawyerOpen(true)}>
                <Edit />
              </IconButton>
              <EditLawyer lawyer={props.lawyer}
                close={() => setEditLawyerOpen(false)}
                refetch={props.lawyerRefetch}
                editOpen={editLawyerOpen} />
            </div>
          )}

          {resultBannerType === resultTypes.CLASS_ACTION && (
            <FBShare name={props.name} />)}

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
      </div>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.content}>{props.children}</CardContent>
      </Collapse>
    </Card>
  );
}

ResultBanner.propTypes = {
  // The children is the component to show when opening the banner
  children: PropTypes.element,
  // Array of the properties to show in the banner {content: content of property,
  //                                                name: Hebrew name of the property,
  //                                                engName: english name of the property}
  selectedProperties: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.any,
      engName: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  // True - has authorization to edit, False - otherwise
  editAuth: PropTypes.bool,
  // Function the fires when pressing the edit button, only if editAuth is True
  handleOpenEditAction: PropTypes.func,
};
