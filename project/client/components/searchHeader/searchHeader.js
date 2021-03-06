import React, { useState } from "react";
import { Button } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import SimpleSelect from "../simpleSelect/simpleSelect";
import Modal from "../modal/modal";
import SearchClassAction from "../searchClassAction/searchClassAction";

import classes from "./searchHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeSort } from "../../store/classAction";
import CategoryByName from "./categoryByName";

const SearchHeader = (props) => {
  const [open, setOpen] = useState(false);
  const filter = useSelector((state) => state.classAction.filter);
  // const [filter] = useState({ ...filterState });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(filter);
  const dispatch = useDispatch();
  const names = filter.categories.map((category) => {
    return <CategoryByName key={category} id={category} />;
  });

  return (
    <div className={classes.searchHeader}>
      <h1 className={classes.searchTitle}>{props.title}</h1>
      <div>
        {filter.name === " " || filter.name === "" || filter.name === undefined
          ? ""
          : "תוצאת חיפוש לפי שם: " + filter.name}
      </div>
      <div>
        {filter.categories.length === 0
          ? ""
          : "תוצאת חיפוש לפי קטגוריה: "}
          {names}
      </div>
      <div>
        {filter.hashtags?.length === 0 || filter.hashtags === undefined
          ? ""
          : "תוצאת חיפוש לפי תגיות: " + filter.hashtags}
      </div>
      <div className={classes.buttonRow}>
        {props.showSort ? 
          <SimpleSelect
          className={classes.select}
          label="מיון"
          items={props.itemsToSelect}
          changed={(event) => dispatch(changeSort(event.target.value))}
        /> : ""  
      }
      {props.showSearch ?
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
