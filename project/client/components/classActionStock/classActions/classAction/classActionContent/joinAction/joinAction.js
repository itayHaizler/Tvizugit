import React,{useState} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '../../../../../modal/modal';
import classes from './joinAction.module.css';
import { Button } from "@material-ui/core";
import JoinForm from './joinForm/joinForm';

const JoinAction = (props) => {
    const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <div className={classes.Join}>
            <Button
                className={classes.filterButton}
                onClick={handleOpen}
                startIcon={<AddCircleIcon fontSize="large"/>}
            >
                 הצטרף לתובענה
        </Button>
            <Modal show={open} onClose={handleClose}>
                <JoinForm classAction={props.classAction} close={handleClose}/>
            </Modal>
        </div>
    );
};

export default JoinAction;