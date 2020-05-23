import React, {useState} from "react";
import { Button } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import SimpleSelect from "../simpleSelect/simpleSelect";
import Modal from "../modal/modal";
import SearchClassAction from "../searchClassAction/searchClassAction";

import classes from "./searchHeader.module.css";
import { useDispatch } from "react-redux";
import {changeSort} from "../../store/classAction";

const SearchHeader = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch=useDispatch();

  return (
    <div className={classes.searchHeader}>
      <h1 className={classes.searchTitle}>{props.title}</h1>
      <div className={classes.buttonRow}>
        {props.showSort === "true" ? 
          <SimpleSelect
          className={classes.select}
          label="מיון"
          items={props.itemsToSelect}
          changed={(event) => dispatch(changeSort(event.target.value))}
        /> : ""  
      }
      {props.showSearch === "true" ?
        <Button
        className={classes.filterButton}
        onClick={handleOpen}
        startIcon={<SortIcon />}
        >
          חפש שוב
        </Button> : ""
      }


        <Modal show={open} onClose={handleClose}>
          <SearchClassAction close={handleClose} />
        </Modal>
      </div>
    </div>
  );
};


export default SearchHeader;
